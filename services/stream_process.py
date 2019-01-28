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

def with_urllib3(url):
    """Get a streaming response for the given event feed using urllib3."""
    import urllib3
    http = urllib3.PoolManager()
    return http.request('GET', url, preload_content=False)

def with_requests(url):
    """Get a streaming response for the given event feed using requests."""
    import requests
    return requests.get(url, stream=True)

# Loop variables
TIME_WINDOW = 5
loops = 1

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

r = requests.post

# Endless ingest loop
while True:
    print("Loops = ", loops);
    #print("Start: ", start_time)
    
    # Update end time 
    end_time = start_time + TIME_WINDOW

    # Hit API
    gen = api.search_comments(after = start_time,
                              before = end_time)

    # Add items to list/dict
    # TODO - make this a function/multithreaded
    for c in gen:
        result_list.append(c)
        # count comments in subreddit
        subreddit_comments[c.subreddit] += 1

    # Update counter variables
    
    start_time = end_time
    
    # Write comments to server
    if loops == 1:
        #pprint.pprint(subreddit_comments)

        r = requests.post(url, data=subreddit_comments)
        #for k,v in subreddit_comments.items():
        #    r.set(k,v)
        print("Sent {} comments to the server!".format(len(subreddit_comments)))
        #print("Total comments processed: ",len(result_list))

    loops += 1
    time.sleep(TIME_WINDOW)    
