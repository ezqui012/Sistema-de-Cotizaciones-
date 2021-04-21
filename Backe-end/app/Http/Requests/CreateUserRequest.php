<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'id_rol'=>'required',
            'id_unit'=>'required',
            'name'=>'required|min:15|max:500|unique:users,name',
            'phone' => 'required|min:7|max:8',
            'ci' => 'required|min:7|max:9',
            'address'=>'required|min:30|max:100',
            'email' => 'required|min:12|max:28',
            'password'=>'required|min:8|max:32'
            //
        ];
    }
}
