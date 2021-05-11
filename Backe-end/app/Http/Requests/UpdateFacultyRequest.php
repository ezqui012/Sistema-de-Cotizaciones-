<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFacultyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name_faculty' => 'required|min:6|max:100',
            'phone_faculty' => 'required|min:7|max:8',
            'email_faculty' => 'required|min:6|max:100',
            'address_faculty' => 'required|min:15|max:100',
            'dean_faculty' => 'required|max:50|min:8',
        ];
    }
}
