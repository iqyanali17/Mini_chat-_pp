# Min WhatsApp - Chat Application

A modern, full-featured web-based messaging application built with Node.js, Express.js, MongoDB, and EJS. This project demonstrates complete CRUD (Create, Read, Update, Delete) operations with a beautiful, WhatsApp-inspired user interface.

![Min WhatsApp](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen) ![License](https://img.shields.io/badge/License-ISC-blue)

## 📋 Table of Contents

- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [How to Run](#-how-to-run)
- [CRUD Operations Explained](#-crud-operations-explained)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Screenshots & Features](#-screenshots--features)
- [Future Improvements](#-future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- ✅ **Create Messages** - Send new chat messages with sender and recipient information
- ✅ **Read Messages** - View all chats in a beautiful, organized list
- ✅ **Update Messages** - Edit existing messages with validation
- ✅ **Delete Messages** - Remove messages with confirmation dialog
- ✅ **Modern UI** - WhatsApp-inspired design with Tailwind CSS
- ✅ **Responsive Design** - Works seamlessly on desktop and mobile devices
- ✅ **Real-time Timestamps** - See when each message was created
- ✅ **Input Validation** - Form validation for data integrity
- ✅ **Error Handling** - Proper error handling and user feedback

## 🛠 Technology Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling tool

### Frontend
- **EJS** - Embedded JavaScript templating
- **Tailwind CSS** - Utility-first CSS framework
- **Font Awesome** - Icon library

### Additional Packages
- **method-override** - HTTP method override middleware for PUT/DELETE requests

## 📁 Project Structure

```
Mong-Exp/
│
├── models/
│   └── chat.js              # MongoDB schema and model
│
├── views/
│   ├── home.ejs             # Home page with project information
│   ├── index.ejs            # Display all chats (Read operation)
│   ├── new.ejs              # Create new chat form
│   └── edit.ejs             # Edit existing chat form
│
├── public/
│   └── style.css            # Custom CSS styles
│
├── index.js                 # Main Express server file
├── init.js                  # Initialization file (if any)
├── package.json             # Project dependencies
├── package-lock.json        # Dependency lock file
└── README.md                # Project documentation
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (running locally on default port 27017)
- **npm** (comes with Node.js)

### Step 1: Clone the Repository

```bash
git clone https://github.com/iqyanali17/Mini_chat-_pp.git
cd Mini_chat-_pp
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- `express`
- `mongoose`
- `ejs`
- `method-override`

### Step 3: Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# On Windows (if MongoDB is installed as a service, it should start automatically)
# Or manually start MongoDB service

# On Linux/Mac
sudo systemctl start mongod
# or
mongod
```

### Step 4: Run the Application

```bash
node index.js
```

The server will start on `http://localhost:8000`

## 🎯 How to Run

1. **Start MongoDB** (if not already running)
2. **Install dependencies**: `npm install`
3. **Run the server**: `node index.js`
4. **Open your browser**: Navigate to `http://localhost:8000`

You should see the home page with project information and navigation options.

## 📚 CRUD Operations Explained

This project implements all four basic CRUD operations. Here's how each one works:

### 1. **CREATE** - Add New Chat Messages

**Route**: `POST /chats`

**How it works**:
1. User navigates to `/chats/new` to see the form
2. Fills in three fields:
   - **From**: Sender's name (required)
   - **Message**: Chat message content (required, max 50 characters)
   - **To**: Recipient's name (required)
3. On form submission, the data is sent to `POST /chats`
4. Server validates all fields are present
5. Creates a new `Chat` document with:
   - `from`: Sender name (trimmed)
   - `to`: Recipient name (trimmed)
   - `msg`: Message content (trimmed)
   - `created_at`: Current timestamp
6. Saves to MongoDB using `newChat.save()`
7. Redirects to `/chats` to show all messages

**Code Location**: `index.js` lines 36-57

**Example Flow**:
```
User Input → Form Validation → Create Chat Object → Save to DB → Redirect to /chats
```

### 2. **READ** - View All Chat Messages

**Route**: `GET /chats`

**How it works**:
1. User navigates to `/chats` or clicks "View All Chats"
2. Server queries MongoDB using `Chat.find({})`
3. Retrieves all chat documents from the database
4. Renders `index.ejs` template with the chats array
5. Template displays each chat in a card format with:
   - Sender and recipient information
   - Message content
   - Timestamp (time and date)
   - Edit and Delete buttons

**Code Location**: `index.js` lines 25-29

**Database Query**:
```javascript
const chats = await Chat.find({}); // Finds all documents
```

**Display Features**:
- Shows total message count
- Empty state when no chats exist
- Beautiful card layout with gradients
- Responsive design

### 3. **UPDATE** - Edit Existing Messages

**Route**: `PUT /chats/:id`

**How it works**:
1. User clicks "Edit" button on any chat card
2. Navigates to `/chats/:id/edit` (e.g., `/chats/507f1f77bcf86cd799439011/edit`)
3. Server finds the chat by ID: `Chat.findById(id)`
4. Renders `edit.ejs` with the chat data pre-filled
5. User modifies the message content
6. On form submission, sends `PUT` request to `/chats/:id?_method=PUT`
7. Server updates the document using `Chat.findByIdAndUpdate()`
8. Updates only the `msg` field while preserving other data
9. Uses `runValidators: true` to ensure schema validation
10. Redirects back to `/chats` to show updated message

**Code Location**: 
- Edit form: `index.js` lines 60-64
- Update handler: `index.js` lines 68-75

**Update Process**:
```javascript
Chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true })
```

**Important Notes**:
- Only the message content can be edited (not sender/recipient)
- Original timestamp is preserved
- Validation ensures message length doesn't exceed 50 characters

### 4. **DELETE** - Remove Messages

**Route**: `DELETE /chats/:id`

**How it works**:
1. User clicks "Delete" button on any chat card
2. JavaScript confirmation dialog appears: "Are you sure you want to delete this chat?"
3. If confirmed, sends `DELETE` request to `/chats/:id?_method=DELETE`
4. Server finds and deletes the document: `Chat.findByIdAndDelete(id)`
5. Document is permanently removed from MongoDB
6. Redirects to `/chats` to show updated list

**Code Location**: `index.js` lines 78-83

**Delete Process**:
```javascript
const deletedChat = await Chat.findByIdAndDelete(id);
```

**Safety Features**:
- Confirmation dialog prevents accidental deletions
- Uses HTTP DELETE method (via method-override)
- Permanent deletion (no soft delete implemented)

## 🛣 API Routes

| Method | Route | Description | View File |
|--------|-------|-------------|-----------|
| GET | `/` | Home page with project information | `home.ejs` |
| GET | `/chats` | Display all chat messages (READ) | `index.ejs` |
| GET | `/chats/new` | Show form to create new chat | `new.ejs` |
| POST | `/chats` | Create new chat message (CREATE) | Redirects to `/chats` |
| GET | `/chats/:id/edit` | Show form to edit chat | `edit.ejs` |
| PUT | `/chats/:id` | Update existing chat (UPDATE) | Redirects to `/chats` |
| DELETE | `/chats/:id` | Delete chat message (DELETE) | Redirects to `/chats` |

## 🗄 Database Schema

The chat messages are stored in MongoDB with the following schema:

```javascript
{
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    maxLength: 50
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}
```

**Field Descriptions**:
- **`from`**: Sender's name (required, string)
- **`to`**: Recipient's name (required, string)
- **`msg`**: Message content (string, maximum 50 characters)
- **`created_at`**: Timestamp when message was created (automatically set)

**MongoDB Collection**: `chats` (pluralized from model name "chat")

## 🎨 Screenshots & Features

### Home Page (`/`)
- Project overview and information
- Feature highlights
- Technology stack display
- Call-to-action buttons
- Beautiful gradient design

### All Chats Page (`/chats`)
- List of all messages in card format
- Sender and recipient information
- Message timestamps
- Edit and Delete buttons for each message
- Empty state when no chats exist
- Message count display

### New Chat Page (`/chats/new`)
- Clean form with three input fields
- Input validation
- Character limit indicator (50 chars)
- Cancel and Submit buttons
- Back navigation

### Edit Chat Page (`/chats/:id/edit`)
- Pre-filled form with existing message
- Chat information display (sender, recipient, ID)
- Update and Cancel buttons
- Form validation

## 🔧 Configuration

### MongoDB Connection

The application connects to MongoDB at:
```
mongodb://127.0.0.1:27017/Whatsapp
```

To change the database connection, modify line 22 in `index.js`:
```javascript
await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
```

### Server Port

The server runs on port `8000` by default. To change it, modify line 94 in `index.js`:
```javascript
app.listen(8000, () => {
    console.log(`http://localhost:${8000}/`);
})
```

## 🐛 Error Handling

The application includes basic error handling:

1. **Validation Errors**: All required fields are checked before saving
2. **Database Errors**: Try-catch blocks handle MongoDB connection and query errors
3. **User Feedback**: Error messages displayed to users when operations fail

## 🚧 Future Improvements

Potential enhancements for the project:

- [ ] User authentication and authorization
- [ ] Real-time messaging with WebSockets
- [ ] Image and file attachments
- [ ] Message search functionality
- [ ] Pagination for large chat lists
- [ ] Soft delete (archive instead of permanent delete)
- [ ] Edit sender/recipient names
- [ ] Message threading/replies
- [ ] Dark mode toggle
- [ ] Export chats to file
- [ ] RESTful API endpoints for external access
- [ ] Unit and integration tests

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**iqyanali17**

- GitHub: [@iqyanali17](https://github.com/iqyanali17)
- Repository: [Mini_chat-_pp](https://github.com/iqyanali17/Mini_chat-_pp.git)

## 🙏 Acknowledgments

- Tailwind CSS for the beautiful UI framework
- Font Awesome for the icon library
- Express.js community for excellent documentation
- MongoDB for the robust database solution

---

**Note**: This project is built for educational purposes to demonstrate CRUD operations with Node.js, Express.js, and MongoDB. It's a great starting point for learning full-stack web development!

For questions or issues, please open an issue on the GitHub repository.

