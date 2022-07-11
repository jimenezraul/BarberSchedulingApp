const router = require("express").Router();
const Setmore = require("../utils/setmore");
const auth = require("../utils/auth");
const { jwtCheck } = require("../utils/jwks");

const setmore = new Setmore();

router.get("/gallery", async (req, res) => {
  const gallery = await setmore.get_gallery();
  res.json(gallery);
});

router.get("/services", jwtCheck, auth, async (req, res) => {
  try {
    const services = await setmore.get_services();
    return res.send(services);
  } catch (error) {
    res.send(error);
  }
});

router.get("/all-services", async (req, res) => {
  try {
    const services = await setmore.get_all_services();
    return res.send(services);
  } catch (error) {
    res.send(error);
  }
});

router.get("/categories", async (req, res) => {
  try {
    const categories = await setmore.get_categories();
    return res.send(categories);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/customer", jwtCheck, auth, async (req, res) => {
  const user = req.user;
  try {
    const customer = await setmore.get_customer(user);
    return res.send(customer);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/appointments", jwtCheck, auth, async (req, res) => {
  const user = req.user;
  const start_time = req.body.startDate;
  const end_time = req.body.endDate;
  try {
    const appointments = await setmore.get_appointments(
      user,
      start_time,
      end_time
    );
    return res.send(appointments);
  } catch (error) {
    return res.send(error);
  }
});

router.get("/get_available_times", jwtCheck, auth, async (req, res) => {
  const { staff, service, date } = req.query;
  try {
    const available_times = await setmore.get_availability(
      staff,
      service,
      date
    );

    return res.send(available_times);
  } catch (error) {
    return res.send(error);
  }
});

router.post("/create_appointment", jwtCheck, auth, async (req, res) => {
  const { staff_key, service_key, customer_key, start_time, end_time, cost } =
    req.body;
  try {
    const appointment = await setmore.create_appointment(
      user,
      staff_key,
      service_key,
      customer_key,
      start_time,
      end_time,
      cost
    );
    return res.send(appointment);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
