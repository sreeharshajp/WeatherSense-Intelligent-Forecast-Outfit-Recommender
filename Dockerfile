# Simple, lightweight Docker setup for guaranteed deployment success
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend files
COPY backend/ .

# Install dependencies (minimal, no ML packages)
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port
EXPOSE 10000

# Run the app with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "--workers", "1", "app:app"]
