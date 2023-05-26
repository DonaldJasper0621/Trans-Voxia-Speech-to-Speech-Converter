import "./ContactFormStyles.css";

function ContactForm() {
  return (
    <div className="from-container">
      <h1 className="mt-20 text-4xl font-semibold text-center items-center mb-4">Send a message to us!</h1>
      <form>
        <input placeholder="Name" />
        <input placeholder="Email" />
        <input placeholder="Subject" />
        <textarea placeholder="Message" rows = "4"></textarea>
        <button>Send Message</button>
      </form>
    </div>
  );
}

export default ContactForm;
