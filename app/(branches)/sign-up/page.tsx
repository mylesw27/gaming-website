import Registration from "@/app/components/Registration/page";
import Navigation from "../../components/Navigation/page";

// I need to add a form to this page
// I need the params of this form to send a POST route to the backend API to create a new user
// I need to add a link to the login page
// After they sign up they need to be redirected to the login page


const SignUp = () => {
    return (
      <div>
        <Navigation />
        <h2>SignUp</h2>
        <Registration />
      </div>
    );
  };
  
  export default SignUp;
  