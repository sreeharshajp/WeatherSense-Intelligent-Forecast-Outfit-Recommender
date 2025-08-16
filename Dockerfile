# Use a specific Python version known for ML compatibility
FROM python:3.10.12-slim

# Set environment variables for Python
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy only the requirements file to leverage Docker cache
COPY backend/requirements.txt .

# Install Python dependencies
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy the rest of the backend application code
COPY backend/ .

# Run the model training script during the build
RUN python clothing_model.py

# Expose the port the app will run on
EXPOSE 10000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]
