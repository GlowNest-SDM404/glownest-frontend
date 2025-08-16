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
    json: () => Promise.resolve({ jwt: 'fake-jwt-token' }),
  })
);

import SignInPage from '../pages/SignInPage';

describe('SignInPage', () => {
  beforeEach(() => {
  fetch.mockClear();
  localStorage.clear();
});

  it('should allow users to type into input fields', async () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'securePassword123');

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('securePassword123');
  });

  it('should call fetch and store JWT when the form is submitted', async () => {
    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), 'test@example.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'securePassword123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/login'),
        expect.objectContaining({
          method: 'POST',
        })
      );
      expect(localStorage.getItem('jwt')).toBe('fake-jwt-token');
    });
  });

  it('should display an error message if login fails', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      })
    );

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>
    );
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText(/email/i), 'wrong@example.com');
    await user.type(screen.getByPlaceholderText(/password/i), 'wrongpassword');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await user.click(submitButton);

    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});