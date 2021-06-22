<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateExpenseItemRequest extends FormRequest
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
            'name_item' => 'required|min:3|max:75',
            'type_item' => 'required|min:3|max:30',
            'unit_item' => 'required|max:10',
            'unit_cost' => 'required',
            'description_item' => 'required|min:10|max:100',
            'subtype_item' => 'required|min:3|max:30'
        ];
    }
}
