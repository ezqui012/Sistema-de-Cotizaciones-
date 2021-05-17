<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateQuoteDetailRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'id_enterprise' => 'required',
            'id_item' => 'required',
            'id_quotation' => 'required',
            'quantity' => 'required',
            'unit_cost' => 'required',
            'date' => 'required',
            'delivery_days' => 'required'
        ];
    }
}
