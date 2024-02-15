import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import * as Yup from "yup";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const { loading, error, clearError, getCharacterByName } = useMarvelService();
  const [char, setChar] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);

  const onCharLoaded = (charName) => {
    setChar(charName);
    console.log(charName[0]);
  };

  const onRequest = (name) => {
    clearError();
    setShowSpinner(loading);

    getCharacterByName(name)
      .then(onCharLoaded)
      .finally(() => {
        setShowSpinner(loading);
      });
  };

  const response = !char ? null : char.length > 0 ? (
    <div className="char__search-valid">
      <div className="valid valid__text">There is! Visit NAME page?</div>
      <a href="#" className="button button__secondary">
        <div className="inner">TO PAGE</div>
      </a>
    </div>
  ) : (
    <div className="error error__text">The character was not found. Check the name and try again</div>
  );

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
        onSubmit={({ charName }) => {
          onRequest(charName);
        }}
      >
        <Form className="char__search-flex">
          <Field id="charName" className="char__field" type="text" name="charName" placeholder="Enter name" />
          <button className="button button__main" type="submit" disabled={loading}>
            <div className="inner">FIND</div>
          </button>
          <FormikErrorMessage className="error error__text" name="charName" component="div" />
        </Form>
      </Formik>
      {response}
    </div>
  );
};

export default CharSearchForm;
