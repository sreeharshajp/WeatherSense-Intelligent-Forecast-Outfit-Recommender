# Ultra-simple Docker setup - guaranteed to work
FROM python:3.11-slim

# Set working directory  
WORKDIR /app

# Copy and install requirements
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy only the app file
COPY backend/app.py app.py

# Expose port
EXPOSE 10000

# Run with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]
