FROM python:3.9 as builder

WORKDIR /app

COPY ../server/ .

FROM library/python:3.6-stretch

COPY ../server/requirements.txt /
RUN pip install -r /requirements.txt

WORKDIR /app

COPY --from=builder /app .

CMD ["python", "app.py"]
