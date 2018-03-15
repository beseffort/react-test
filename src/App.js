import React, { Component } from 'react';
import Notifications, {notify} from 'react-notify-toast';
import FormErrors from './components/FormErrors';
import Text from './components/Text';
import './App.css';

function layoutWrapper(WrappedComponent) {
  return class App extends React.Component {
    render() {
      return (
        <div className="container mx-auto p-4 md:p-0">                      
          <WrappedComponent {...this.props} />      
          <Notifications />
        </div>
      )
    }
  }
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      day: '',
      month: '',
      year: '',
      outputAge: '',
      formErrors: { name: '', email: '', age: '' },
      nameValid: false,
      emailValid: false,
      ageValid: false,
      formValid: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    let myColor = { background: '#F38181', text: "#FFFFFF" };
    notify.show("Here we'd probably save the form data to a database, session or local storage for reference later in the course.", "custom", 5000, myColor);
  };

  handleUserInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  calcAge() {
    const { day, month, year } = this.state;
    const dateStr =   year + '/' + month + '/' + day;
    const ageDiffms = Date.now() - new Date(dateStr);
    const ageDate = new Date(ageDiffms);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970) + 'yo';
    this.setState({ outputAge: age });
  }

  validateField(fieldName, value) {
    let { formErrors, emailValid, nameValid, dobValid, dayValid, monthValid, yearValid } = this.state;

    switch (fieldName) {
      case 'userName':
        nameValid = value.match(/^[a-zA-Z ]+$/);
        formErrors.name = nameValid ? '' : ' is invalid';
        break;
      case 'userEmail':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'day':
        dayValid = parseInt(value, 10)>0 & parseInt(value, 10)<32;        
        dobValid = dayValid && monthValid && yearValid;
        formErrors.dob = dobValid ? '' : ' is invalid';
        if (dobValid) {
          this.calcAge();
        }
        break;
      case 'month':
        monthValid = parseInt(value, 10)>0 & parseInt(value, 10)<13;
        dobValid = dayValid && monthValid && yearValid;
        formErrors.dob = dobValid ? '' : ' is invalid';
        if (dobValid) {
          this.calcAge();
        }
        break;
      case 'year':
        const today = new Date();
        const currentYear = today.getFullYear();
        yearValid = parseInt(value, 10)>1900 & parseInt(value, 10)<currentYear;
        dobValid = dayValid && monthValid && yearValid;
        formErrors.dob = dobValid ? '' : ' is invalid';
        if (dobValid) {
          this.calcAge();
        }
        break;
      default:
        break;
    }
    this.setState(
      { formErrors, nameValid, emailValid, dayValid, monthValid, yearValid, dobValid },
      this.validateForm,
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid && this.state.nameValid && this.state.dobValid,
    });
  }

  render() {
    const { userName, userEmail, outputAge, day, month, year } = this.state;

    return (
      <div className="flex flex-col md:flex-row md:flex-wrap items-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mb-8 md:mb-0 p-4 md:p-6 lg:mr-8 lg:ml-auto">      
          <form onSubmit={this.handleSubmit}>
            <div className="mb-6">
              <input
                id="userName"
                type="text"
                name="userName"
                value={userName}
                placeholder="Name"
                className="bg-theme-grey-light w-full rounded-full text-white h-10 px-4 py-2"
                required
                autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                onChange={this.handleUserInput}
              />
            </div>
            <div className="mb-6">
              <div className="flex">
                  <div className="flex">
                    <input
                      placeholder="DD"
                      id="day"
                      type="number"
                      name="day"
                      value={day}
                      autoComplete='bday-day'
                      className="bg-theme-grey-light w-1/3 rounded-full text-white h-10 px-4 py-2 mr-2"
                      required
                      onChange={this.handleUserInput}
                    />
                    <input
                      placeholder="MM"
                      id="month"
                      type="number"
                      name="month"
                      value={month}
                      autoComplete='bday-month'
                      className="bg-theme-grey-light w-1/3 rounded-full text-white h-10 px-4 py-2 mx-2"
                      required
                      onChange={this.handleUserInput}
                    />
                    <input
                      placeholder="YYYY"
                      id="year"
                      type="number"
                      name="year"
                      value={year}
                      autoComplete='bday-year'
                      className="bg-theme-grey-light w-1/3 rounded-full text-white h-10 px-4 py-2 ml-2"
                      required
                      onChange={this.handleUserInput}
                    />
                  </div>
              </div>
            </div>
            <div className="mb-6">
              <input
                id="userEmail"
                type="email"
                name="userEmail"
                value={userEmail}
                placeholder="email@domain.com"
                className="bg-theme-grey-light w-full rounded-full text-white h-10 px-4 py-2"
                required
                autoComplete='email'
                onChange={this.handleUserInput}
              />
            </div>
            <div className="mb-6 text-theme-primary text-center">
              <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div>
              <button
                type="submit"
                className={'bg-theme-primary w-full rounded-full text-white h-10 px-4 py-2 ' + (!this.state.formValid ? 'cursor-not-allowed opacity-50' : 'bg-theme-primary')}
                disabled={!this.state.formValid}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 lg:mr-auto p-4 md:p-6 bg-white rounded-lg">
          <Text label="Name" text={userName} />
          <Text label="Age" text={outputAge} />
          <Text label="Email" text={userEmail} />
        </div>
      </div>
    );
  }
}

export default layoutWrapper(Form);
