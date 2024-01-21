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
      "error": "Error message describing the issue"
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

---

## Example Usage:

### Upload Image Example:

```bash
curl -X POST -H "Content-Type: multipart/form-data" -F "image=@/path/to/image.jpg" http://localhost:4000/api/upload
