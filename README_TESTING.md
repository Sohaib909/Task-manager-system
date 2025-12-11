# Unit Testing Setup and Explanation

## 📚 What are Unit Tests?

**Unit tests** are automated tests that check if individual pieces of your code work correctly. Think of them as quality checks for each function, component, or API endpoint.

### Simple Analogy:
Imagine you're building a car:
- **Unit Test** = Testing each part individually (engine, wheels, brakes)
- **Integration Test** = Testing parts working together
- **End-to-End Test** = Testing the whole car driving

### Why Unit Tests Matter:

1. **Catch Bugs Early** 🐛
   - Find problems before users do
   - Fix issues when they're small and easy to fix

2. **Documentation** 📖
   - Tests show how your code should work
   - New developers can understand code by reading tests

3. **Confidence** 💪
   - Change code without fear
   - Know if you broke something immediately

4. **Save Time** ⏰
   - Automated testing is faster than manual testing
   - Run tests in seconds instead of testing manually for hours

---

## 🧪 What We're Testing

### 1. API Endpoints (`__tests__/api/tasks.test.js`)

Tests all your backend API routes:

✅ **POST /api/tasks** - Creating tasks
- ✅ Creates task with valid data
- ✅ Rejects empty title
- ✅ Rejects title over 100 characters
- ✅ Uses default values for optional fields

✅ **GET /api/tasks** - Getting all tasks
- ✅ Returns list of tasks
- ✅ Filters by status
- ✅ Filters by priority
- ✅ Searches by title

✅ **GET /api/tasks/:id** - Getting single task
- ✅ Returns task by ID
- ✅ Returns 404 if not found

✅ **PATCH /api/tasks/:id** - Updating tasks
- ✅ Updates status
- ✅ Updates title
- ✅ Validates input
- ✅ Returns 404 if not found

✅ **DELETE /api/tasks/:id** - Deleting tasks
- ✅ Deletes task successfully
- ✅ Returns 404 if not found

### 2. React Components (`__tests__/components/TaskForm.test.tsx`)

Tests your form component:

✅ **Rendering**
- ✅ All form fields appear
- ✅ Character counter shows
- ✅ Loading state displays

✅ **Validation**
- ✅ Shows error for empty title
- ✅ Shows error for title too long
- ✅ Updates character counter

✅ **User Interactions**
- ✅ User can type in fields
- ✅ User can change priority
- ✅ Form submits with valid data

---

## 🚀 How to Run Tests

### Step 1: Install Dependencies
```bash
npm install
```

This installs:
- `jest` - Testing framework
- `supertest` - For testing API endpoints
- `@testing-library/react` - For testing React components
- `@testing-library/jest-dom` - Additional matchers

### Step 2: Run Tests

**Run all tests once:**
```bash
npm test
```

**Run tests in watch mode (auto-reruns on file changes):**
```bash
npm run test:watch
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

### Step 3: Understand Test Output

**✅ Passing Test:**
```
✓ should create a new task (45ms)
```

**❌ Failing Test:**
```
✗ should create a new task (12ms)
  Expected: "Test Task"
  Received: "Different Task"
```

**Test Summary:**
```
Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
Time:        2.5s
```

---

## 📝 Test Examples Explained

### Example 1: Testing API Endpoint

```javascript
it('should create a new task with valid data', async () => {
  // 1. Prepare test data
  const taskData = {
    title: 'Test Task',
    description: 'This is a test',
    status: 'pending',
    priority: 'high'
  }

  // 2. Make API request
  const response = await request(app)
    .post('/api/tasks')
    .send(taskData)
    .expect(201)  // Expect HTTP 201 (Created)

  // 3. Verify response
  expect(response.body).toHaveProperty('_id')
  expect(response.body.title).toBe('Test Task')
})
```

**What this does:**
1. Creates test data
2. Sends POST request to create task
3. Expects HTTP 201 status (success)
4. Checks response has `_id` (task was created)
5. Checks title matches what we sent

### Example 2: Testing Validation

```javascript
it('should return 400 if title is missing', async () => {
  // 1. Try to create task without title
  const response = await request(app)
    .post('/api/tasks')
    .send({ description: 'No title' })
    .expect(400)  // Expect HTTP 400 (Bad Request)

  // 2. Verify error message
  expect(response.body.error).toContain('Title is required')
})
```

**What this does:**
1. Tries to create task with missing title
2. Expects HTTP 400 (validation error)
3. Checks error message says "Title is required"

### Example 3: Testing React Component

```javascript
it('should show error when title is empty', async () => {
  // 1. Render the form
  render(<TaskForm onSubmit={mockOnSubmit} />)

  // 2. Try to submit without filling title
  const submitButton = screen.getByTestId('submit-button')
  fireEvent.click(submitButton)

  // 3. Wait for error message and verify it
  await waitFor(() => {
    expect(screen.getByTestId('error-message'))
      .toHaveTextContent('Title is required')
  })
})
```

**What this does:**
1. Renders the form component
2. Clicks submit button
3. Waits for error message to appear
4. Verifies error message is correct

---

## 🎯 Test Coverage

**Coverage** shows how much of your code is tested.

Run coverage report:
```bash
npm run test:coverage
```

**Coverage Types:**
- **Statements**: How many lines of code executed
- **Branches**: How many if/else paths tested
- **Functions**: How many functions called
- **Lines**: How many lines covered

**Good Coverage:**
- 80%+ = Excellent
- 60-80% = Good
- < 60% = Needs improvement

---

## 📋 Test Checklist

When writing tests, ask:

- [ ] Does it test one thing at a time?
- [ ] Does it have a clear, descriptive name?
- [ ] Does it test both success and failure cases?
- [ ] Does it test edge cases (empty, null, max length)?
- [ ] Is it easy to read and understand?

---

## 🔧 Troubleshooting

### Tests won't run?
```bash
# Make sure dependencies are installed
npm install

# Clear cache and try again
npm test -- --clearCache
```

### MongoDB connection error?
- Tests use a test database
- Make sure MongoDB is running
- Or use MongoDB Atlas for testing

### Import errors?
- Make sure `jest.config.js` is configured correctly
- Check that file extensions match (.js, .ts, .tsx)

---

## 📖 Learn More

- **Jest Documentation**: https://jestjs.io/docs/getting-started
- **React Testing Library**: https://testing-library.com/react
- **Supertest**: https://github.com/visionmedia/supertest

---

## ✅ Summary

Unit tests are like having a robot that:
1. Tests your code automatically
2. Runs in seconds
3. Catches bugs before users do
4. Documents how your code works
5. Gives you confidence to change code

**Run the tests now:**
```bash
npm test
```

See `TESTING_GUIDE.md` for more detailed information!

