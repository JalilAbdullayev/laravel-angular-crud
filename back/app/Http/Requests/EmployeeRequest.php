<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeeRequest extends FormRequest {
    public function rules(): array {
        return [
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array {
        $required = 'The :attribute field is required.';
        $string = 'The :attribute field must be a string.';
        $max = 'The :attribute field must not exceed :max characters.';
        return [
            'name.required' => $required,
            'address.required' => $required,
            'phone.required' => $required,
            'name.string' => $string,
            'address.string' => $string,
            'phone.string' => $string,
            'name.max' => $max,
            'address.max' => $max,
            'phone.max' => $max,
        ];
    }

    public function authorize(): bool {
        return true;
    }
}
