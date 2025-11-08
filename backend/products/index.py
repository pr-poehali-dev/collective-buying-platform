import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def get_db_connection():
    dsn = os.environ.get('DATABASE_URL')
    return psycopg2.connect(dsn, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления складчинами - получение списка, создание, присоединение
    Args: event с httpMethod, body, queryStringParameters
    Returns: HTTP response с данными о складчинах
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters') or {}
            category = params.get('category')
            status = params.get('status')
            
            query = '''
                SELECT 
                    p.*,
                    COUNT(DISTINCT pt.id) as current_participants,
                    CASE 
                        WHEN p.max_participants > 0 
                        THEN p.total_price / p.max_participants 
                        ELSE 0 
                    END as price_per_person
                FROM products p
                LEFT JOIN participants pt ON p.id = pt.product_id
            '''
            
            conditions = []
            if category:
                conditions.append(f"p.category = '{category}'")
            if status:
                conditions.append(f"p.status = '{status}'")
            
            if conditions:
                query += ' WHERE ' + ' AND '.join(conditions)
            
            query += ' GROUP BY p.id ORDER BY p.created_at DESC'
            
            cur.execute(query)
            products = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps([dict(p) for p in products], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            
            if action == 'create':
                cur.execute('''
                    INSERT INTO products 
                    (title, description, image_url, category, total_price, max_participants, status)
                    VALUES (%s, %s, %s, %s, %s, %s, %s)
                    RETURNING id
                ''', (
                    body_data['title'],
                    body_data.get('description', ''),
                    body_data.get('image_url', ''),
                    body_data.get('category', 'Другое'),
                    body_data['total_price'],
                    body_data['max_participants'],
                    'recruiting'
                ))
                product_id = cur.fetchone()['id']
                conn.commit()
                
                return {
                    'statusCode': 201,
                    'headers': {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                    },
                    'body': json.dumps({'id': product_id, 'message': 'Складчина создана'}),
                    'isBase64Encoded': False
                }
            
            elif action == 'join':
                product_id = body_data['product_id']
                
                cur.execute('SELECT max_participants FROM products WHERE id = %s', (product_id,))
                product = cur.fetchone()
                
                cur.execute('SELECT COUNT(*) as count FROM participants WHERE product_id = %s', (product_id,))
                current_count = cur.fetchone()['count']
                
                if current_count >= product['max_participants']:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Все места заняты'}),
                        'isBase64Encoded': False
                    }
                
                cur.execute('''
                    INSERT INTO participants (product_id, user_name, user_email)
                    VALUES (%s, %s, %s)
                    ON CONFLICT (product_id, user_email) DO NOTHING
                    RETURNING id
                ''', (
                    product_id,
                    body_data['user_name'],
                    body_data['user_email']
                ))
                
                result = cur.fetchone()
                if result:
                    conn.commit()
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'message': 'Вы успешно присоединились!'}),
                        'isBase64Encoded': False
                    }
                else:
                    return {
                        'statusCode': 400,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'body': json.dumps({'error': 'Вы уже участвуете в этой складчине'}),
                        'isBase64Encoded': False
                    }
        
        return {
            'statusCode': 405,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        cur.close()
        conn.close()
