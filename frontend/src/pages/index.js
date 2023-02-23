import Layout from "../hocs/Layout";
import Headphones from '../../public/images/headphones.jpg';
import Image from 'next/image'
import Link from "next/link";

const HomePage = () => {
  return (
    <Layout title="Home" content="">
      <h1 className="display-4 mt-5/">Showtech</h1>
      <h2 className="fs-4 fw-light fst-italic mt-3">Cutting-edge tech assets & equipment</h2>
      <div className="mt-5 bg-light p-5 rounded shadow">
        <h3 className="display-6">Blasting Blueberry Headphones</h3>
        <p className="lead mt-3 mb-4">A sound experience far beyond your limits</p>
        <Link href='/checkout' legacyBehavior>
          <a className="btn btn-info shadow-sm">Buy this item</a>
        </Link>
      </div>
      <div className="row mt-5 mb-5">
        <div className="col-3">
          <Image 
          className="img-fluid"
          src={Headphones}
          alt="Headphones"
          />
        </div>
        <div className="offset-2 col-7">
          <ul className="list-group list-group-flush mt-5">
            <li className="list-group-item fs-4 lead">
              Ergonomic
            </li>
            <li className="list-group-item fs-4 lead">
              High Sound Quality
            </li>
            <li className="list-group-item fs-4 lead">
              Bluetooth
            </li>
            <li className="list-group-item fs-4 lead">
              Size Adjustable
            </li>
            <li className="list-group-item fs-4 lead">
              Noise Cancelling
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
