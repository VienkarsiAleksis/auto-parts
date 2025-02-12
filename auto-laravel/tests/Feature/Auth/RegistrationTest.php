<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_registration_screen_can_be_rendered(): void
    {
        $response = $this->get('/register');

        $response->assertStatus(200);
    }

    public function test_user_cannot_register_with_empty_name(): void
    {
        $response = $this->post('/register', [
            'name' => '',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('name');
        $this->assertGuest();
    }

    public function test_user_cannot_register_with_empty_email(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => '',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_user_cannot_register_with_empty_password(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => '',
            'password_confirmation' => '',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }

    public function test_user_cannot_register_with_non_matching_password_confirmation(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
            'password_confirmation' => 'different_password',
        ]);

        $response->assertSessionHasErrors('password');
        $this->assertGuest();
    }

    public function test_user_cannot_register_with_existing_username(): void
{
    // Create a user with a specific email
    User::factory()->create([
        'name' => 'existing_user', // Use a distinct name to avoid conflicts
        'email' => 'test@example.com',
        'password' => bcrypt('password'),
    ]);

    // Attempt to register with the same username
    $response = $this->post('/register', [
        'name' => 'existing_user', // Duplicate username
        'email' => 'unique@example.com', // Different email
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Check for the error message for the name field
    $response->assertSessionHasErrors('name');
    $this->assertGuest();
}


    public function test_new_users_can_register(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test User',
            'email' => 'unique@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $this->assertAuthenticated();
        $response->assertRedirect(RouteServiceProvider::HOME);
    }
}
