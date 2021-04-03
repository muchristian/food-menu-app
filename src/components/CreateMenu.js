import React, {useEffect, useState} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Select from './Select';
import firebs, {storage} from '../firebase'; 
import {useHistory} from 'react-router-dom';
import _ from 'lodash';

const initialValues = { name: '', price: '', category: '', image: '' };
const options = [
    {value:'Breakfast', label:'Breakfast'},
    {value:'Lunch', label:'Lunch'},
    {value:'Dinner', label:'Dinner'}
]


function CreateMenu(props) {
    console.log(props)
    const [values, setValues] = useState(initialValues);
    const history = useHistory();
    const param = new URLSearchParams(history.location.search);
    console.log(param.get('id'))
    useEffect(() => {
        if (!param.get('id')) {
            console.log('create')
            setValues({
                ...initialValues
            })
        } else {
            console.log('update')
            const menu = props.data && props.data.find(d=> d.id === param.get('id'))
            console.log(menu)
            setValues({
                ..._.omit(menu, ['id', 'image'])
            })
        }
    }, [param.get('id'), props.data])

    const CreateSchema = Yup.object().shape({
        name: Yup.string()
          .required('Name field is required!'),
          price: Yup.number()
          .required('Price field is required!'),
        category: Yup.string()
          .required('Category field is required!'),
          image: param.get('id') ?
          Yup
          .mixed()
          :
          Yup
            .mixed()
            .required("A file is required")
      });

    function onSubmit(values, actions) {
            console.log(values)
            if(!param.get('id')) {
                const data1 = {
                    ..._.omit(values, ['image']),
                    image: values.image.name
                }
                const menuRef = firebs.database().ref().child('Menu')
                storage.ref().child('images/' + values.image.name).put(values.image, { type: values.image.type });
                
                console.log(data1)
                menuRef.push(data1);
            } else {
                const menuRef = firebs.database().ref('Menu').child(param.get('id'))
                values.image && storage.ref().child('images/' + values.image.name).put(values.image, { type: values.image.type });
                    const data = {
                        ..._.omit(values, ['image']),
                        image: values.image ? values.image.name : props.data.find(d=> d.id === param.get('id')).image
                    }
                
                menuRef.set(data);
            }
            
    }
    return (
                    <Formik
                       enableReinitialize
                       initialValues={values}
                       validationSchema={CreateSchema}
                       onSubmit={onSubmit}
                     >
                        {props => (
                        <form onSubmit={props.handleSubmit}>
                            <div className="form-group">
                                <label className="form-control-label">NAME</label>
                                <input 
                                type="text"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.name}
                                name="name" 
                                className="form-control" id="inputError"/>
                                {props.touched.name && props.errors.name ? (
                                      <span className="help-block error">{props.errors.name}</span>
                                    ) : null}
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PRICE</label>
                                <input 
                                type="number"
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                value={props.values.price}
                                name="price" 
                                className="form-control" id="inputError"/>
                                {props.touched.price && props.errors.price ? (
                                      <span className="help-block error">{props.errors.price}</span>
                                    ) : null}
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">Category</label>
                                <Select 
                                options={options}
                                value={props.values.category}
                                onChange={value=>props.setFieldValue('category', value.value)}
                                />
                                
                                {props.touched.category && props.errors.category ? (
                                      <span className="help-block error">{props.errors.category}</span>
                                    ) : null}
                            </div>
                            <div className="form-group row">
                                <label className="col-2 control-label">Image<span className="text-danger">*</span></label>
                                <div className="col-10">
                                <div class="input-group">
                                    <input id="uploadLogo" className="form-control" placeholder="Choose File" disabled="disabled" 
                                    value={props.values.image ? props.values.image.name : ''}/>
                                    <div className="input-group-btn">
                                      <div className="fileUpload btn btn-danger">
                                        <span><i className="glyphicon glyphicon-upload"></i> Upload Image</span>
                                        <input id="image-id" name="image" type="file" className="attachment_upload" onChange={(event) => {
                                                props.setFieldValue("image", event.currentTarget.files[0]);
                                              }} onBlur={props.handleBlur}/>
                                      </div>
                                    </div>
                                  </div>
                                          
                                {props.touched.image && props.errors.image ? (
                                      <span className="help-block error">{props.errors.image}</span>
                                    ) : null}
                                </div>
                            </div>

                            <div className="col-lg-12 loginbttm">
                                <div className="col-lg-6 login-btm login-text">
                                    {/* <!-- Error Message --> */}
                                </div>
                                <div className="col-lg-6 login-btm login-button">
                                    <button type="submit" className="btn btn-outline-primary">SUBMIT</button>
                                </div>
                            </div>
                        </form>
                        )}
                        </Formik>
    );
}

export default CreateMenu;