import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

// Mock useUser from UserContext to avoid context errors
vi.mock('../contexts/UserContext', () => ({
  useUser: () => ({
    refreshUserFromToken: vi.fn(),
    user: null,
  }),
}));

// Mock fetch to simulate backend API call
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: 'User registered' }),
  })
);

import SignUpPage from '../pages/SignUpPage';

describe('SignUpPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('should allow users to type into input fields', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    // Find the input fields using their placeholders
    const firstNameInput = screen.getByPlaceholderText(/first name/i);
    const lastNameInput = screen.getByPlaceholderText(/last name/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const phoneInput = screen.getByPlaceholderText(/phone number/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    // Simulate user typing
    await user.type(firstNameInput, 'Test');
    await user.type(lastNameInput, 'User');
    await user.type(emailInput, 'test@example.com');
    await user.type(phoneInput, '1234567890');
    await user.type(passwordInput, 'securePassword123');

    // Assert that the input values match what was typed
    expect(firstNameInput.value).toBe('Test');
    expect(lastNameInput.value).toBe('User');
    expect(emailInput.value).toBe('test@example.com');
    expect(phoneInput.value).toBe('1234567890');
    expect(passwordInput.value).toBe('securePassword123');
  });

  it('should call fetch when the form is submitted', async () => {
    render(
      <MemoryRouter>
        <SignUpPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    // Fill required fields
    await user.type(screen.getByPlaceholderText(/first name/i), 'Test');
    await user.type(screen.getByPlaceholderText(/last name/i), 'User');
    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/phone number/i), '1234567890');
    await user.type(screen.getByPlaceholderText(/password/i), 'securePassword123');

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /sign up/i });
    await user.click(submitButton);

    // Assert that fetch was called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/register'),
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });
});