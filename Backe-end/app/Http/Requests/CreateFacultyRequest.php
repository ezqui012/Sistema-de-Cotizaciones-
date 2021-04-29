<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateFacultyRequest extends FormRequest
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
            'name_faculty' => 'required|min:10|max:100|unique:faculties,name_faculty',
            'phone_faculty' => 'required|min:7|max:8|min:7',
            'email_faculty' => 'required|min:5|max:100',
            'address_faculty' => 'required|min:1|max:100',
            'dean_faculty' => 'required|max:50',
        ];
    }
}
