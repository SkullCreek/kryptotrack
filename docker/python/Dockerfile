FROM python:3.9 as builder

WORKDIR /app

COPY ../server/ .

FROM library/python:3.6-stretch

COPY ../server/requirements.txt /
RUN pip install -r /requirements.txt
RUN pip install "pymongo[srv]"

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5000

CMD ["python", "app.py"]
