# Ultra-simple Docker setup - guaranteed to work
FROM python:3.11-slim

# Set working directory  
WORKDIR /app

# Copy and install requirements
COPY backend/requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy only the app file
COPY backend/app.py app.py

# Expose port (Render uses $PORT)
EXPOSE $PORT

# Run with gunicorn using the PORT environment variable
CMD ["gunicorn", "--bind", "0.0.0.0:${PORT}", "app:app"]
