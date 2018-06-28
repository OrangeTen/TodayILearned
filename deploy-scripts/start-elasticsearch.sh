#!/bin/bash

sudo docker run\
 -d --rm\
 -p 9200:9200\
 -p 9300:9300\
 --name elasticsearch\
 elasticsearch:5.6
