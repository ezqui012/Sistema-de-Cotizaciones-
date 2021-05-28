<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateQuotationDetailRequest extends FormRequest
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
