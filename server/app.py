from flask import Flask, jsonify, request
from models import mongo_db
import jwt
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/login', methods=['POST'])
def login():
  try:
    users = mongo_db.Mongo_Db()
  except Exception as e:
    response = {
      "auth": "error",
      "message": "Something went wrong, try again",
    }
    users.close()
    return jsonify(response)

  if users.conn():
    search_query = {'name': request.form['username']}
    try:
      login_user = users.search(search_query, "Users")
    except Exception as e:
      response = {
        "auth": "error",
        "message": "Something went wrong, try again",
      }
      users.close()
      return jsonify(response)

    if login_user:
      if request.form['password'] == login_user['password']:
        encoded = jwt.encode({"username": request.form['username']}, "123", algorithm="HS256")
        response = {
          "auth": "success",
          "message": "Login Success",
          "token": encoded
        }
        users.close()
        return jsonify(response)
      else:
        response = {
          "auth": "error",
          "message": "Password or Username is incorrect!"
        }
        users.close()
        return jsonify(response)
    else:
      response = {
        "auth": "error",
        "message": "Password or Username is incorrect!"
      }
      users.close()
      return jsonify(response)
  else:
    response = {
      "auth": "error",
      "message": "Database connection error"
    }
    users.close()
    return jsonify(response)


@app.route('/signup', methods=['POST'])
def signup():
  if request.method == 'POST':
    try:
      users = mongo_db.Mongo_Db()
    except Exception as e:
      response = {
        "auth": "error",
        "message": "Something went wrong, try again",
      }
      users.close()
      return jsonify(response)
    if users.conn():
      search_query = {'name': request.form['username']}
      try:
        exsisting_user = users.search(search_query, "Users")
      except Exception as e:
        response = {
          "auth": "error",
          "message": "Something went wrong"
        }
        users.close()
        return jsonify(response)
      if exsisting_user is None:
        try:
          insert_query = {"name": request.form['username'], "password": request.form['password']}
          users.add("Users", insert_query)
        except Exception as e:
          response = {
            "auth": "error",
            "message": "Something went wrong"
          }
          users.close()
          return jsonify(response)
        encoded = jwt.encode({"username": request.form['username']}, "123", algorithm="HS256")
        response = {
          "auth": "success",
          "message": "Signup Success",
          "token": encoded
        }
        return jsonify(response)
      else:
        response = {
          "auth": "error",
          "message": "User Already Exists"
        }
        users.close()
        return jsonify(response)
    else:
      response = {
        "auth": "error",
        "message": "Database connection error"
      }
      users.close()
      return jsonify(response)
  else:
    response = {
      "auth": "error",
      "message": "POST method expected"
    }
    return jsonify(response)


if __name__ == '__main__':
  app.run(debug=True)
