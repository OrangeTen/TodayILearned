#!/bin/bash

sudo docker run\
 -d --rm\
 -p 27017:27017\
 --name mongo\
 mongo:3.2
