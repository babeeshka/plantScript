import Joi from 'joi';

const defaultImageSchema = Joi.object({
    license: Joi.number().optional(),
    license_name: Joi.string().optional(),
    license_url: Joi.string().uri().optional(),
    original_url: Joi.string().uri().optional(),
    regular_url: Joi.string().uri().optional(),
    medium_url: Joi.string().uri().optional(),
    small_url: Joi.string().uri().optional(),
    thumbnail: Joi.string().uri().optional(),
});

const plantAnatomySchema = Joi.object({
    part: Joi.string().required(),
    color: Joi.array().items(Joi.string()).required(),
});

const pruningCountSchema = Joi.alternatives().try(
    Joi.object({
        amount: Joi.number().required(),
        interval: Joi.string().required(),
    }).allow(null).required(),
    Joi.array().length(0)
).optional();

const plantSchema = Joi.object({
    id: Joi.number().required(),
    common_name: Joi.string().required(),
    scientific_name: Joi.array().items(Joi.string()).required(),
    other_name: Joi.array().items(Joi.string()).allow(null).optional(),
    family: Joi.string().allow(null).optional(),
    origin: Joi.array().items(Joi.string()).allow(null).optional(),
    type: Joi.string().required(),
    dimension: Joi.string().allow(null, "").optional(),
    dimensions: Joi.alternatives().try(
        Joi.object({
            type: Joi.string().allow(null).optional(),
            min_value: Joi.number().optional(),
            max_value: Joi.number().optional(),
            unit: Joi.string().allow("").optional(),
        }),
        Joi.array().length(0)
    ).optional(),
    cycle: Joi.string().allow(null, "").optional(),
    attracts: Joi.array().items(Joi.string()).allow(null).optional(),
    propagation: Joi.array().items(Joi.string()).required(),
    hardiness: Joi.object({
        min: Joi.string().allow("").optional(),
        max: Joi.string().allow("").optional(),
    }).allow(null).optional(),
    hardiness_location: Joi.object({
        full_url: Joi.string().uri().required(),
        full_iframe: Joi.string().required(),
    }).allow(null).optional(),
    watering: Joi.string().required(),
    depth_water_requirement: Joi.alternatives().try(
        Joi.object({
            unit: Joi.string().allow(null, "").required(),
            value: Joi.number().allow(null, "").required(),
        }),
        Joi.array().length(0)
    ).optional(),
    volume_water_requirement: Joi.alternatives().try(
        Joi.object({
            unit: Joi.string().required(),
            value: Joi.number().required(),
        }),
        Joi.array().length(0)
    ).optional(),
    watering_period: Joi.string().allow(null).optional(),
    watering_general_benchmark: Joi.object({
        value: Joi.string().allow(null).required(),
        unit: Joi.string().allow(null).required(),
    }).allow(null).optional(),
    plant_anatomy: Joi.array().items(plantAnatomySchema).required(),
    sunlight: Joi.array().items(Joi.string()).required(),
    pruning_month: Joi.array().items(Joi.string()).allow(null).required(),
    pruning_count: pruningCountSchema,
    seeds: Joi.number().allow(null).optional(),
    maintenance: Joi.string().allow(null).required(),
    care_guides: Joi.string().uri().optional(),
    soil: Joi.array().items(Joi.string()).required(),
    growth_rate: Joi.string().required(),
    drought_tolerant: Joi.boolean().required(),
    salt_tolerant: Joi.boolean().required(),
    thorny: Joi.boolean().required(),
    invasive: Joi.boolean().required(),
    tropical: Joi.boolean().required(),
    indoor: Joi.boolean().required(),
    care_level: Joi.string().allow(null).required(),
    pest_susceptibility: Joi.array().items(Joi.string()).allow(null).optional(),
    pest_susceptibility_api: Joi.string().allow('Coming Soon', null, '').optional(),
    flowers: Joi.boolean().required(),
    flowering_season: Joi.string().allow(null).required(),
    flower_color: Joi.string().allow("").required(),
    cones: Joi.boolean().required(),
    fruits: Joi.boolean().required(),
    edible_fruit: Joi.boolean().required(),
    edible_fruit_taste_profile: Joi.string().allow(null).optional(),
    fruit_nutritional_value: Joi.string().allow(null).optional(),
    fruit_color: Joi.array().items(Joi.string()).required(),
    harvest_season: Joi.string().allow(null).optional(),
    leaf: Joi.boolean().required(),
    leaf_color: Joi.array().items(Joi.string()).required(),
    edible_leaf: Joi.boolean().required(),
    cuisine: Joi.boolean().required(),
    medicinal: Joi.boolean().required(),
    poisonous_to_humans: Joi.number().required(),
    poisonous_to_pets: Joi.number().required(),
    description: Joi.string().allow(null).required(),
    default_image: defaultImageSchema.allow(null).optional(),
    other_images: Joi.any().optional(), // TODO consider defining a more specific schema if possible
}).unknown(true);

export default plantSchema;