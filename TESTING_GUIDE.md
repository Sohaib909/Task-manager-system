# Unit Testing Guide

## What are Unit Tests?

**Unit tests** are automated tests that verify individual units (functions, methods, components, endpoints) of your code work correctly in isolation. Think of them as quality checks for each small piece of your application.

### Key Concepts:

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Fast**: Unit tests run quickly (milliseconds, not seconds)
3. **Repeatable**: Same input should always produce same output
4. **One thing at a time**: Each test verifies one specific behavior

### Why Unit Tests Matter:

✅ **Catch bugs early** - Find issues before users do  
✅ **Documentation** - Tests show how code should be used  
✅ **Confidence** - Refactor code without fear of breaking things  
✅ **Design** - Writing tests helps you write better code  
✅ **Regression prevention** - Ensure old bugs don't come back  

---

## Test Structure

### Basic Test Pattern:

```javascript
describe('What you are testing', () => {
  it('should do something specific', () => {
    // Arrange: Set up test data
    const input = 'test data'
    
    // Act: Execute the function
    const result = functionToTest(input)
    
    // Assert: Verify the result
    expect(result).toBe('expected output')
  })
})
```

---

## Our Test Files

### 1. API Endpoint Tests (`__tests__/api/tasks.test.js`)

**What it tests:**
- ✅ Creating tasks (POST /api/tasks)
- ✅ Getting all tasks (GET /api/tasks)
- ✅ Getting single task (GET /api/tasks/:id)
- ✅ Updating tasks (PATCH /api/tasks/:id)
- ✅ Deleting tasks (DELETE /api/tasks/:id)
- ✅ Validation (required fields, max length)
- ✅ Error handling (404, 400 errors)

**Example Test:**
```javascript
it('should create a new task with valid data', async () => {
  const taskData = {
    title: 'Test Task',
    description: 'This is a test',
    status: 'pending',
    priority: 'high'
  }

  const response = await request(app)
    .post('/api/tasks')
    .send(taskData)
    .expect(201)  // Expect HTTP 201 Created

  expect(response.body).toHaveProperty('_id')
  expect(response.body.title).toBe('Test Task')
})
```

**What this test does:**
1. Sends a POST request to create a task
2. Expects HTTP status 201 (Created)
3. Verifies the response has an `_id` (task was created)
4. Verifies the title matches what we sent

---

### 2. Component Tests (`__tests__/components/TaskForm.test.tsx`)

**What it tests:**
- ✅ Form renders correctly
- ✅ Input validation (required fields, max length)
- ✅ Character counter updates
- ✅ Form submission with valid data
- ✅ Error messages display
- ✅ Loading states
- ✅ User interactions (typing, selecting)

**Example Test:**
```javascript
it('should show error when title is empty', async () => {
  render(<TaskForm onSubmit={mockOnSubmit} />)

  const submitButton = screen.getByTestId('submit-button')
  fireEvent.click(submitButton)

  await waitFor(() => {
    expect(screen.getByTestId('error-message'))
      .toHaveTextContent('Title is required')
  })
})
```

**What this test does:**
1. Renders the TaskForm component
2. Clicks the submit button without filling title
3. Waits for error message to appear
4. Verifies error message says "Title is required"

---

## Running Tests

### Install Dependencies First:
```bash
npm install
```

### Run All Tests:
```bash
npm test
```

### Run Tests in Watch Mode (auto-rerun on file changes):
```bash
npm run test:watch
```

### Run Tests with Coverage Report:
```bash
npm run test:coverage
```

This shows:
- Which lines of code are tested
- Which lines are not tested
- Percentage of code covered

---

## Test Coverage Explained

**Coverage** tells you how much of your code is tested:

- **100% Coverage** = Every line of code is tested (ideal but not always practical)
- **80%+ Coverage** = Good coverage
- **< 50% Coverage** = Need more tests

**Coverage Types:**
- **Line Coverage**: How many lines executed
- **Branch Coverage**: How many if/else paths tested
- **Function Coverage**: How many functions called

---

## Writing Good Tests

### ✅ DO:
- Test one thing at a time
- Use descriptive test names
- Test both success and failure cases
- Test edge cases (empty strings, null values, max lengths)
- Keep tests simple and readable

### ❌ DON'T:
- Test implementation details (how it works internally)
- Write tests that depend on other tests
- Test third-party libraries (they have their own tests)
- Write overly complex tests

---

## Common Test Patterns

### 1. Testing API Endpoints:
```javascript
// Test successful request
it('should return 200 and data', async () => {
  const response = await request(app)
    .get('/api/tasks')
    .expect(200)
  
  expect(Array.isArray(response.body)).toBe(true)
})

// Test error case
it('should return 404 if not found', async () => {
  const response = await request(app)
    .get('/api/tasks/invalid-id')
    .expect(404)
  
  expect(response.body.error).toBe('Task not found')
})
```

### 2. Testing React Components:
```javascript
// Test rendering
it('should render form fields', () => {
  render(<TaskForm />)
  expect(screen.getByLabelText('Title')).toBeInTheDocument()
})

// Test user interaction
it('should update input value', () => {
  render(<TaskForm />)
  const input = screen.getByLabelText('Title')
  fireEvent.change(input, { target: { value: 'New Task' } })
  expect(input).toHaveValue('New Task')
})
```

### 3. Testing Validation:
```javascript
it('should reject invalid input', async () => {
  const response = await request(app)
    .post('/api/tasks')
    .send({ title: '' })  // Empty title
    .expect(400)  // Bad Request
  
  expect(response.body.error).toContain('Title is required')
})
```

---

## Understanding Test Results

### ✅ Passing Test:
```
✓ should create a new task (45ms)
```
Green checkmark = Test passed

### ❌ Failing Test:
```
✗ should create a new task (12ms)
  Expected: "Test Task"
  Received: "Different Task"
```
Red X = Test failed, shows what was expected vs what was received

### Test Summary:
```
Test Suites: 2 passed, 2 total
Tests:       15 passed, 15 total
```
Shows how many tests passed/failed

---

## Next Steps

1. **Run the tests**: `npm test`
2. **Read failing tests**: Fix any issues
3. **Add more tests**: Cover edge cases
4. **Check coverage**: `npm run test:coverage`
5. **Keep tests updated**: Update tests when you change code

---

## Benefits for Your Project

With these unit tests, you can:

1. **Verify API works correctly** - All endpoints tested
2. **Ensure validation works** - Required fields, max lengths tested
3. **Catch regressions** - If you break something, tests will fail
4. **Document behavior** - Tests show how code should work
5. **Refactor safely** - Change code knowing tests will catch issues

---

## Questions?

- **What if a test fails?** - Read the error message, it tells you what went wrong
- **Should I test everything?** - Focus on critical paths (user flows, validation, errors)
- **How often should I run tests?** - Before committing code, ideally in watch mode while developing

