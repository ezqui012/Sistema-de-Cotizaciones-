<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateUnitRequest extends FormRequest
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
            'id_faculty' => 'required',
            'name_unit' => 'required|min:10|max:100|unique:units,name_unit',
            'type' => 'required|min:5|max:14',
            'creation_date' => 'required',
            'amount' => 'nullable'
        ];
    }
}
