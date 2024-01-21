# Image Upload and Retrieval API

This repository contains a simple Express.js server for image uploading and retrieval using MongoDB.

## Requirements

1. **Node.js and npm:**
   - Install Node.js and npm from [https://nodejs.org/](https://nodejs.org/).
   - Verify the installation by running `node -v` and `npm -v` in your terminal.

2. **MongoDB:**
   - Install MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
   - Follow the installation instructions for your operating system.

## Getting Started

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Babigdk/tobamsgroup.git
   cd tobamsgroup

2. **cd backend**

2. **Run**
   ```bash
   npm install
   npm start


# Image Upload API

## Upload Image

**Endpoint:** `POST /api/upload`

### Request

- **Method:** `POST`
- **URL:** `http://localhost:4000/api/upload`
- **Headers:**
  - Content-Type: `multipart/form-data`

**Form Data:**
- `image`: The image file to be uploaded. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`

### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:**
    ```json
    {
      "message": "Image uploaded successfully",
      "imageUrl": "/api/get_image/{image_id}"
    }
    ```
- **Error:**
  - **Status Code:** `400 Bad Request` or `500 Internal Server Error`
  - **Body:**
    ```json
    {
      "error": "Invalid file type. Only images with .jpg, .jpeg, .png, or .gif extensions are allowed"
    }
    ```

## Get Image

**Endpoint:** `GET /api/get_image/:id`

### Request

- **Method:** `GET`
- **URL:** `http://localhost:4000/api/get_image/{image_id}`

### Response

- **Success:**
  - **Status Code:** `200 OK`
  - **Body:** The image content.
  - **Headers:**
    - Content-Type: `image/{image_format}`
- **Error:**
  - **Status Code:** `404 Not Found` or `500 Internal Server Error`
  - **Body:**
    ```json
    {
      "error": "Error message describing the issue"
    }
    ```
## Example Usage:

### Upload Image Example:

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@/path/to/image.jpg" http://localhost:4000/api/upload
```

- **Replace /path/to/image.jpg with the actual path of the image to be uploaded**


### Get Image Example:

```bash
http://localhost:4000/api/get_image/{image_id}
```

- **Replace {image_id} with the actual _id of the uploaded image**
