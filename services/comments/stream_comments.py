import json
import pprint
import sseclient
from psaw import PushshiftAPI
import praw
from collections import defaultdict
import time
import multiprocessing
import redis
import requests
import sqlite3

timeframe = 'comments'
sql_transaction = []

connection = sqlite3.connect('{}.db'.format(timeframe))
c2 = connection.cursor()
start_row = 0
cleanup = 1000000
SQL_BATCH = 1000

def create_table():
    c2.execute("""CREATE TABLE IF NOT EXISTS comments(
    comment_id TEXT PRIMARY KEY, parent_id TEXT, link TEXT, author_id TEXT,
    permalink TEXT UNIQUE, subreddit_id TEXT, author TEXT, controversiality INT,
    comment TEXT, subreddit TEXT, created_utc INT, score INT)""")

def transaction_bldr(sql):
    global sql_transaction
    sql_transaction.append(sql)
    if len(sql_transaction) > SQL_BATCH:
        c2.execute('BEGIN TRANSACTION')
        for s in sql_transaction:
            try:
                c2.execute(s)
            except sqlite3.Error as e:
                print('SQL Error: ', e.message)
                pass
        connection.commit()
        print("Sent {} comments to db!".format(SQL_BATCH))
        sql_transaction = []

def sql_full_insert(id,parent_id,link,author_id,permalink,subreddit_id,author,controversiality,comment,subreddit,unix,score):
    try:
        sql = """INSERT INTO comments (comment_id,parent_id,link,author_id,permalink,subreddit_id,author,controversiality,comment,subreddit,created_utc,score) VALUES ("{}","{}","{}","{}","{}","{}","{}",{},"{}","{}",{},{});""".format(id,parent_id,link,author_id,permalink,subreddit_id,author,int(controversiality),comment,subreddit,int(unix),score)
        transaction_bldr(sql)
    except Exception as e:
        print('s0 insertion',str(e))

def with_urllib3(url):
    """Get a streaming response for the given event feed using urllib3."""
    import urllib3
    http = urllib3.PoolManager()
    return http.request('GET', url, preload_content=False)

def with_requests(url):
    """Get a streaming response for the given event feed using requests."""
    import requests
    return requests.get(url, stream=True)

def format_data(data):
    data = data.replace('\n',' newlinechar ').replace('\r',' newlinechar ').replace('"',"'")
    return data


if __name__ == '__main__':
    # Loop variables
    TIME_WINDOW = 5
    loops = 1
    create_table()

    # URL for server
    url = 'http://192.168.2.44:3001/comments/bulk'

    # API information
    api = PushshiftAPI()
    gen = api.search_comments(limit = 1)
    results = list(gen)

    # Use latest comment as start time - aka start collecting from now
    start_time = results[0].created_utc

    # Empty data structues
    result_list = []
    subreddit_comments = defaultdict(int)
    package = {}

    # Let comments accumulate
    time.sleep(TIME_WINDOW)

    # Endless ingest loop
    while True:
        #print("Start: ", start_time)

        # Update end time
        end_time = start_time + TIME_WINDOW

        # Hit API
        gen = api.search_comments(after = start_time,
                                  before = end_time)

        # Add items to list/dict
        # TODO - make this a function/multithreaded
        for row in gen:
            try:
                id = row.id
                parent_id = row.parent_id
                comment = format_data(row.body)
                unix = row.created_utc
                score = row.score
                author = row.author
                #if author == '[removed]' or '[deleted]':
                #    author_id = author
                #else:
                #    author_id = row.author_fullname
                author_id = 'na'
                controversiality = 0
                link = row.link_id
                permalink = row.permalink
                subreddit_id = row.subreddit_id
                subreddit = row.subreddit
                sql_full_insert(id,parent_id,link,author_id,permalink,subreddit_id,author,controversiality,comment,subreddit,unix,score)
            except AttributeError as e:
                print(e)
                print(id)
                pass

        # Update counter variables

        start_time = end_time

        # # Write comments to server
        # if loops%5 == 0:
        #     #pprint.pprint(subreddit_comments)
        #
        #     r = requests.post(url, data=subreddit_comments)
        #     #print(subreddit_comments.nbytes)
        #     #for k,v in subreddit_comments.items():
        #     #    r.set(k,v)
        #     print("Sent {} comments to the server!".format(len(subreddit_comments)))
        #     #print("Total comments processed: ",len(result_list))

        if loops%10 == 0:
            print("Loops: ", loops)
        loops += 1
        time.sleep(TIME_WINDOW)
