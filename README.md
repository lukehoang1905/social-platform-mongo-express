# social-platform-mongo-express

## Description

A social platform web application built with MERN stack. This is the codebase for the MongoDB NodeJS and Express RESTful backend API.

This is the solution for the full-stack web dev course @CoderSchoolVn

## Features

This include all common features of a Social Platform.

### User authentication and managing account

1. User can create account with email and password
2. User can login with email and password
3. User can see a list of all users
4. User can see other user's information by id
5. Owner can see own user's information
6. Owner can update own account profile
7. Owner can deactivate own account

### CRUD post with friend only access

1. Authenticated user can make a post (POST a post)
2. Author can update post by post's id
3. Author can delete post by post's id
4. Friend can see list of friend's post

### CRUD comment & reaction for friend

1. Friend can make a comment (POST a comment) to other friend's post
2. Friend can see a list of all comment belong to friend's post
3. Author of Comment can update that comment
4. Author of Comment can delete that comment
5. Friend can make a reaction (like, dislike) to each other post

### Managing friend relationship

1. Authenticated user can see list of friend
2. Authenticated user can make friend request to other
3. Authenticated user can accept or reject a friend request
4. Authenticated user can see a list of all request receive
5. Author can see a list of all request sent
6. Author of Request can cancel the request
7. Friend can unfriend

## Production API

- [Doc](https://app.swaggerhub.com/apis-docs/dhminh1024/CoderComm/1.0.0#/Reaction/createReaction)

- [App demo](https://codercomm-dot-cs-platform-306304.et.r.appspot.com/)

## The end

@copyright by CoderSchool
