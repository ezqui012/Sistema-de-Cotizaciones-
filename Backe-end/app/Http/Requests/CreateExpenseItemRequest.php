<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateExpenseItemRequest extends FormRequest
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
            'name_item' => 'required|min:3|max:75|unique:expense_item,name_item',
            'type_item' => 'required|min:3|max:30',
            'unit_item' => 'required|max:10',
            'unit_cost' => 'required',
            'description_item' => 'required|min:10|max:100',
            'subtype_item' => 'required|min:3|max:30'
        ];
    }

    public function messages()
    {
        return [
            'name_item.unique'=> 'El nombre que desea asignar al item ya se encuentra registrado, escriba otro nombre para el item.'
        ];
    }
}
