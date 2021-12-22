import React, {forwardRef, useImperativeHandle} from 'react';
import {Formik, FormikProps, FormikConfig} from 'formik';

 /* eslint-disable @typescript-eslint/no-explicit-any */
function FormikWithRef(props: FormikConfig<any>, ref: any) {
    let _formikProps: FormikProps<any>;

    useImperativeHandle(ref, () => (_formikProps));

    return (
        <Formik {...props}>
            {(formikProps) => {
                _formikProps = formikProps;
                if (typeof props.children === 'function') {
                    return props.children(formikProps);
                }
                return props.children;
            }}
        </Formik>
    );
}

export default forwardRef(FormikWithRef)
