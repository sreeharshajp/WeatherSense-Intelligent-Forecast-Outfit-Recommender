# Use a stable Python version
FROM python:3.10.12

# Set the working directory in the container
WORKDIR /usr/src/app

# Install system-level dependencies and build tools
# This is crucial for compiling packages like scikit-learn
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy the backend application code into the container
COPY backend/ .

# Install Python dependencies
# Upgrading pip and installing from requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Run the model training script to generate the .pkl file
RUN python clothing_model.py

# Expose the port the app will run on
EXPOSE 10000

# Command to run the application using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]
