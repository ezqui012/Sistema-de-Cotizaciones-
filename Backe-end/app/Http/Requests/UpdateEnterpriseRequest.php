<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateEnterpriseRequest extends FormRequest
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
                'name_enterprise'=>'required|min:5|max:100|unique:enterprise,name_enterprise, '  . $this->route()->id_enterprise . ',id_enterprise',
                'sector_enterprise'=>'required|min:4|max:30',
                'legal_representative'=>'required|min:10|max:100',
                'phone_enterprise' => 'required|min:7|max:8',
                'nit_enterprise' => 'required|min:7|max:9|unique:enterprise,nit_enterprise, ' . $this->route()->id_enterprise . ',id_enterprise',
                'address_enterprise'=>'required|min:10|max:100',
                'email_enterprise' => 'required|min:8|max:32|unique:enterprise,email_enterprise,' . $this->route()->id_enterprise . ',id_enterprise'
                //

        ];
    }
    public function messages()
    {
        return [
            'nit_enterprise.unique'=> 'El Nit que pretende ingresar encuentra en uso',
            'email_enterprise.unique'=> 'El correo que pretende ingresar se encuentra en uso',
            'name_enterprise.unique'=> 'El Nombre que pretende ingresar se encuentra en uso'
        ];
    }
}
