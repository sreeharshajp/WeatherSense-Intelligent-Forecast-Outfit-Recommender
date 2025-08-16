# Stage 1: The Builder
# This stage has all the build tools needed to compile wheels.
FROM python:3.10.12-buster AS builder

# Install build dependencies
RUN apt-get update && apt-get install -y build-essential

# Set the working directory
WORKDIR /usr/src/app

# Install wheel package to build wheels
RUN pip install --upgrade pip wheel

# Copy requirements file
COPY backend/requirements.txt .

# Build wheels for all dependencies and store them in /wheels
# This pre-compiles everything.
RUN pip wheel --no-cache-dir --wheel-dir=/usr/src/app/wheels -r requirements.txt


# Stage 2: The Final Image
# This stage is lightweight and uses the pre-built wheels.
FROM python:3.10.12-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy the pre-built wheels from the builder stage
COPY --from=builder /usr/src/app/wheels /wheels

# Copy the requirements file
COPY backend/requirements.txt .

# Install the packages from the local wheels
# --no-index prevents pip from going to PyPI
# --find-links points to our local wheel directory
RUN pip install --no-cache-dir --no-index --find-links=/wheels -r requirements.txt

# Copy the rest of the application code
COPY backend/ .

# Run the model training script
RUN python clothing_model.py

# Expose the port
EXPOSE 10000

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:10000", "app:app"]
