import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [toPage, setToPage] = useState();

  return (
    <div className="char__search">
      <label className="char__search-name" htmlFor="charName">
        Or find a character by name:
      </label>
      <Formik
        initialValues={{ name: "" }}
        validationSchema={Yup.object({
          charName: Yup.string()
            .matches(/^\D*$/, "String characters only")
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("This field is required"),
        })}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="char__search-flex">
            <Field id="charName" className="char__field" type="text" name="charName" placeholder="Enter name" />
            <button className="button button__main" type="submit" disabled={isSubmitting}>
              <div className="inner">FIND</div>
            </button>
            <FormikErrorMessage className="error error__text" name="charName" component="div" />
          </Form>
        )}
      </Formik>
      <div className="char__search-valid">
        <div className="valid valid__text">There is! Visit NAME page?</div>
        <a href={toPage} className="button button__secondary">
          <div className="inner">TO PAGE</div>
        </a>
      </div>
      <div className="error error__text">The character was not found. Check the name and try again</div>
    </div>
  );
};

export default CharSearchForm;
