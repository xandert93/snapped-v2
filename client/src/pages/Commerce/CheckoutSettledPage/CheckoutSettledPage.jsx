import { Link } from '../../../components';
import { useURLParams } from '../../../hooks';

export const CheckoutSettledPage = () => {
  //*** Didn't do this page properly at all functionality wise.
  //Revisit and look at other website's checkcout complete/cancelled pages as well as their URL query string
  const { success, cancelled } = useURLParams();

  return success ? (
    <div className="success">
      <h2>Thank you for your order!</h2>
      <p className="email-msg">Check your email inbox for the receipt.</p>
      <p className="description">
        If you have any questions, please email
        <a className="email" href="mailto:order@example.com">
          order@example.com
        </a>
      </p>
      <Link to="/shop">
        <button type="button">Continue Shopping</button>
      </Link>
      {/*delete this bit below...just for ease of t/e*/}
      <Link to="/account/subscription">
        <button type="button">Go back to subscription</button>
      </Link>
    </div>
  ) : cancelled ? (
    <p>Checkout cancelled</p>
  ) : (
    <p>Not found!</p>
  );
};
