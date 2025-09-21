/**
 * @swagger
 * tags:
 *   name: Rides
 *   description: Ride management endpoints
 */

/**
 * @swagger
 * /api/rides:
 *   post:
 *     summary: Request a new ride (Rider)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pickup
 *               - destination
 *             properties:
 *               pickup:
 *                 type: string
 *                 example: "123 Main St"
 *               destination:
 *                 type: string
 *                 example: "456 Park Ave"
 *               price:
 *                 type: number
 *                 example: 15
 *     responses:
 *       201:
 *         description: Ride requested successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/rides/requested:
 *   get:
 *     summary: Get all requested rides (Driver)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of requested rides
 */

/**
 * @swagger
 * /api/rides/{id}/accept:
 *   put:
 *     summary: Accept a ride (Driver)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride accepted
 */

/**
 * @swagger
 * /api/rides/{id}/complete:
 *   put:
 *     summary: Mark a ride as completed (Driver)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride completed
 */

/**
 * @swagger
 * /api/rides:
 *   get:
 *     summary: Get all rides (Admin)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all rides
 */

/**
 * @swagger
 * /api/rides/{id}:
 *   delete:
 *     summary: Delete a ride (Admin)
 *     tags: [Rides]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Ride ID
 *     responses:
 *       200:
 *         description: Ride removed
 *       404:
 *         description: Ride not found
 */

const express = require("express");
const { auth, isAdmin } = require("../middleware/auth");

const router = express.Router();
const {
  requestRide,
  getRequestedRides,
  acceptRide,
  completedRide,
  getAllRides,
  deleteRide,
} = require("../controller/rideController");

// Rider routes
router.post("/", auth, requestRide);

// Driver routes
router.get("/requested", auth, getRequestedRides);
router.put("/:id/accept", auth, acceptRide);
router.put("/:id/complete", auth, completedRide);

// Admin routes
router.get("/", auth, isAdmin, getAllRides);
router.delete("/:id", auth, isAdmin, deleteRide);

module.exports = router;
