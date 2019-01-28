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
from datetime import datetime

## DB information
timeframe = 'submissions'
sql_transaction = []

connection = sqlite3.connect('{}.db'.format(timeframe))
c = connection.cursor()
start_row = 0
cleanup = 1000000
SQL_BATCH = 1000

def with_urllib3(url):
    """Get a streaming response for the given event feed using urllib3."""
    import urllib3
    http = urllib3.PoolManager()
    return http.request('GET', url, preload_content=False)

def with_requests(url):
    """Get a streaming response for the given event feed using requests."""
    import requests
    return requests.get(url, stream=True)

def create_table():
    c.execute("""CREATE TABLE IF NOT EXISTS submissions(
    id TEXT PRIMARY KEY, url TEXT, selftext TEXT, nsfw TEXT,
    permalink TEXT UNIQUE, subreddit_id TEXT, author TEXT,
    title TEXT, subreddit TEXT, created_utc INT, score INT)""")

def format_data(data):
    data = data.replace('\n',' newlinechar ').replace('\r',' newlinechar ').replace('"',"'")
    return data

def transaction_bldr(sql):
    global sql_transaction
    sql_transaction.append(sql)
    if len(sql_transaction) > SQL_BATCH:
        c.execute('BEGIN TRANSACTION')
        for s in sql_transaction:
            try:
                c.execute(s)
            except:
                pass
        connection.commit()
        print("Sent {} submissions to db!".format(SQL_BATCH))
        sql_transaction = []

def sql_full_insert(id, url, selftext, nsfw, permalink, subreddit_id, author, title, subreddit, created_utc, score):
    try:
        sql = """INSERT INTO submissions (id, url, selftext, nsfw, permalink, subreddit_id, author, title, subreddit, created_utc, score) VALUES ("{}","{}","{}","{}","{}","{}","{}","{}","{}",{},{});""".format(id, url, selftext, nsfw, permalink, subreddit_id, author, title, subreddit, int(created_utc), score)
        transaction_bldr(sql)
    except Exception as e:
        print('s0 insertion',str(e))




if __name__ == '__main__':
    create_table()
    # Loop variables
    TIME_WINDOW = 5
    loops = 1

    # URL for server
    url = 'http://192.168.2.44:3001/comments/bulk'

    # API information
    api = PushshiftAPI()
    gen = api.search_submissions(limit = 1)
    results = list(gen)

    # Use latest comment as start time - aka start collecting from now
    start_time = results[0].created_utc

    # Empty data structues
    result_list = []
    subreddit_posts = defaultdict(int)
    package = {}

    # Let comments accumulate
    time.sleep(TIME_WINDOW)
    politics_subreddits = ['Republican', 'socialism', 'politics', 'The_Donald', 'Libertarian', 'conservative','World_Politics']
    political_posts = {}
    for sub in politics_subreddits:
        political_posts[sub] = []

    # Endless ingest loop
    while True:

        #print("Start: ", start_time)

        # Update end time
        end_time = start_time + TIME_WINDOW

        # Hit API
        gen = api.search_submissions(after = start_time,
                                  before = end_time)

        # Add items to list/dict
        # TODO - make this a function/multithreaded
        for row in gen:
            try:
                id = row.id
                selftext = format_data(row.selftext)
                created_utc = row.created_utc
                score = row.score
                author = row.author
                url = row.url
                permalink = row.permalink
                subreddit_id = row.subreddit_id
                subreddit = row.subreddit
                nsfw = row.over_18
                title = row.title
                sql_full_insert(id, url, selftext, nsfw, permalink, subreddit_id, author, title, subreddit, created_utc, score)
            except AttributeError as e:
                print(e)
                pass
            # count comments in subreddit
            #print(c.title)
            # if c.subreddit in politics_subreddits:
            #     pl = {'title': c.title,
            #           'url': c.url,
            #           'original': c.is_original_content,
            #           'permalink': c.permalink}
            #     political_posts[c.subreddit].append(pl)
            #     pprint.pprint(political_posts)
            # subreddit_posts[c.subreddit] += 1

        # Update counter variables

        start_time = end_time

        # Write comments to server
        #if loops%5 == 0:
            #pprint.pprint(subreddit_posts)

            #r = requests.post(url, data=subreddit_comments)
            #for k,v in subreddit_comments.items():
            #    r.set(k,v)
            #print("Sent {} comments to the server!".format(len(subreddit_comments)))
            #print("Total comments processed: ",len(result_list))

        if loops%10 == 0:
            print("Loop: ", loops)
        loops += 1
        time.sleep(TIME_WINDOW)
