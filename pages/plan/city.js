import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Datemodal from "../../Components/Ui/DateModal/DateModal";
import Plancard from "../../Components/Ui/Cards/Plancard";
import Detailspage from "../../Components/Detailspage/Detailspage";
import { planActions } from "../../store/store";
import { useRouter } from "next/dist/client/router";
import classes from "./plan.module.css";
function Plancity() {
  const planSelector = useSelector((state) => state.plan);
  const planDispatch = useDispatch(planActions);
  const router = useRouter();

  const cities = useSelector((state) => state.cities.citiesList);
  const [selectedCity, setSelectedCity] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [errorModal, setErrorModal] = useState(<></>);
  function hideErrorhandler(){
    setErrorModal(<></>)
  }
  function clicked(text) {
    setSelectedCity(text);
    window.scrollTo(0, 0)
  }
  function selectCityHandler() {
    if (planSelector.days > 0) {
      planDispatch(planActions.addCity(selectedCity));
      router.push("/plan/flight");
    } else {
      setErrorModal(
        <div onClick={hideErrorhandler} className={classes["error-background"]}>
          <div className={classes["error"]}>
            <div className={classes["error-title"]}>Error</div>
            <div className={classes["error-text"]}>Please Select a travel date above</div>
            <div onClick={hideErrorhandler} className={classes["error-btn"]}>Okay</div>
          </div>
        </div>
      );
    }
  }
  const cityList = cities.map((item) => {
    return (
      <Plancard
        onClick={() => {
          clicked(item);
        }}
        desc={item.desc}
        rating={item.rating}
        title={item.title}
        img={item.imgs[0]}
      />
    );
  });
  return (
    <div className={classes.plan}>
      {showModal && <Datemodal />}
      {errorModal}
      {selectedCity && (
        <Detailspage
          desc={selectedCity.desc}
          rating={selectedCity.rating}
          title={selectedCity.title}
          imgs={selectedCity.imgs}
          planning={true}
        />
      )}
      {selectedCity && (
        <div onClick={selectCityHandler} className={classes["plan-button"]}>
          Plan a Flight!
        </div>
      )}
      {cityList}
    </div>
  );
}

export default Plancity;
