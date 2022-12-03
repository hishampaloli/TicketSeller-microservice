import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser + ">>>>>>>>>>>>.");
  axios.get("/api/users/currentuser");
  return (
    <div>
      <h1>786</h1>
    </div>
  );
};

LandingPage.getInitialProps = async ({req}) => {

  console.log(req.headers);
  if (typeof window === "undefined") {
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser", {
        headers: req.headers
      }
    );

    return data;
  } else {
    const { data } = await axios.get("/api/users/currentuser");

    return data;
  }

  return {};
};

export default LandingPage;

// const LandingPage = ({ currentUser }) => {
//   console.log(currentUser);
//   axios.get('/api/users/currentuser').catch((err) => {
//     console.log(err.message);
//   });

//   return <h1>Landing Page</h1>;
// };
