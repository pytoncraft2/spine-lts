---
date: 2023-01-03
# categories:
#   - TODO fill in categories
# tags:
#   - TODO fill in tags
# description: TODO fill in a description
# subtitle: TODO fill in a subtitle
# image: TODO add root relative image link
toc: false
markup: pandoc
title: TODO Thermodynamique
---

# TODO Thermodynamique

---
relation phpmyadmin à faire:
- [x] **thermodynamique**: gamme_id | actif | marque_id | num_serie | libelle | slug
- [x] **codes_defauts_thermodynamique**: id_thermodynamique | slug | code
- [x] **fichier_thermodynamique**: 	id_thermodynamique
- [x] **fichiers_retour_experience_thermodynamique**: retour_experience_thermodynamique_id
- [x] **favori**: thermodynamique_id
- [x] **history_message_slack**: thermodynamique_id
- [x] **image_plaques**: thermodynamique_id
- [x] **retour_experience_thermodynamique**: marque_id | gamme_id | codes_defauts_thermodynamique_id |thermodynamique_id 
- [x] **historical_access**: marque_id | gamme_id | codes_defauts_thermodynamique_id |thermodynamique_id 

---
src/Entity/Thermodynamique.php

- [x] à ajouter:
```php
* @ORM\JoinColumn(nullable=false, name="marque_id", referencedColumnName="MA_ID")
*/
private $marque;
```
- [x] ajouter "cascade={"persist"}, orphanRemoval=true" dans les commentaires des codesDefauts retour Experience et fichier
```php
    /**
     * @ORM\OneToMany(targetEntity=CodesDefautsThermodynamique::class, mappedBy="thermodynamique", cascade={"persist"}, orphanRemoval=true)
     */
    private $codesDefautsThermodynamiques;

    /**
     * @ORM\OneToMany(targetEntity=FichierThermodynamique::class, mappedBy="thermodynamique", cascade={"persist"}, orphanRemoval=true)
     */
    private $fichierThermodynamiques;

// src/Entity/RetourExperienceClimExterieur.php
    /**
     * @ORM\OneToMany(targetEntity=FichiersRetourExperienceThermodynamique::class, mappedBy="retourExperienceThermodynamique", cascade={"persist"}, orphanRemoval=true)
     */
    private $fichiersRetourExperienceThermodynamiques;
```
---
- [x] A Compléter dans l'Entity Gamme la relation avec la class Thermodynamique !
---

src/Repository/CodesDefautsThermodynamiqueRepository.php

- [x] ajouter les fonctions searchLibelle, findDistinctCodeByMarques, findDistinctResolutionsBySlugAndMarques, searchLibelleByMarques, findByMarquesWithNotSameRetourExperienceItRefFabriquant, de la même manière que les autres fichiers repository
---
- [x] src/Entity/CodesDefautsThermodynamique
```php
/**
* @ORM\ManyToOne(targetEntity=ClimExterieur::class, inversedBy="codesDefautsThermodynamique")
* @ORM\JoinColumns({
*   @ORM\JoinColumn(name="id_thermodynamique", referencedColumnName="id")
* })
*/
private $thermodynamique

```
- [x] ASSERT
```php


     /**
     * @Assert\File(
     *     maxSize = "10M",
     *     mimeTypes = {"image/jpeg", "image/gif", "image/png"},
     *     maxSizeMessage = "La taille maximale de l'image est de 10Mo",
     *     mimeTypesMessage = "Seulement les images de type jpeg, gif et png sont acceptées"
     * )
     * @Vich\UploadableField(mapping="products_code_img_clim_exterieur", fileNameProperty="imgCode")
     * @var File
     */
    private $imageFile;

    /**
     * @Assert\File(
     *     maxSize = "10M",
     *     mimeTypes = {"image/jpeg", "image/gif", "image/png"},
     *     maxSizeMessage = "La taille maximale de l'image est de 10Mo",
     *     mimeTypesMessage = "Seulement les images de type jpeg, gif et png sont acceptées"
     * )
     * @Vich\UploadableField(mapping="products_resolution_img_clim_exterieur", fileNameProperty="imgResolution")
     * @var File
     */
    private $imageResolutionFile;

    /**
     * @Assert\File(
     *     maxSize = "10M",
     *     mimeTypes = {"image/jpeg", "image/gif", "image/png"},
     *     maxSizeMessage = "La taille maximale de l'image est de 10Mo",
     *     mimeTypesMessage = "Seulement les images de type jpeg, gif et png sont acceptées"
     * )
     * @Vich\UploadableField(mapping="products_libelle_img_clim_exterieur", fileNameProperty="imgLibelle")
     * @var File
     */
    private $imageLibelleFile;


/************************************/
/** RELATION À FAIRE **/
/************************************/
    /**
     * @ORM\OneToMany(targetEntity=UserHistoricalAccess::class, mappedBy="codeClimExterieur")
     */
    private $userHistoricalAccesses;

    /**
     * @ORM\OneToMany(targetEntity=RetourExperienceClimExterieur::class, mappedBy="codeDefautClimExterieur")
     */
    private $retourExperienceClimExterieurs;

```
- [x] relation et date à faire/ajouter
```php
133l
    public function __construct()
    {
        $this->retourExperienceRegulations = new ArrayCollection();
        $this->userHistoricalAccesses = new ArrayCollection();
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }
```
---

src/Entity/FichierThermodynamique.php

- [x] VICH
```php
/**
 * @ORM\Entity(repositoryClass=FichierThermodynamiqueRepository::class)
 * @Vich\Uploadable
 */
class FichierThermodynamique implements EstUnFichier
{
    ```

```php
    /**
     * @Vich\UploadableField(mapping="products_clim_exterieur_pdf", fileNameProperty="filename", size="fileSize")
     *
     * @var File
     */
    private $file;

    private $label;
```

---
src/Entity/FichiersRetourExperienceThermodynamique.php
- [x] VICH


- [x] RELATION À FAIRE
```php
    /**
     * @ORM\ManyToOne(targetEntity=ClimExterieur::class, inversedBy="fichierClimExterieurs")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="id_clim_exterieur", referencedColumnName="id")
     * })
     */
    private $climExterieur;

    /**
     * @ORM\OneToMany(targetEntity=UserHistoricalAccess::class, mappedBy="fileClimExterieur")
     */
    private $userHistoricalAccesses;

```
- [x] Dates
```php
    public function __construct()
    {
        $this->userHistoricalAccesses = new ArrayCollection();

        //à ajouté !
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }
```
---
 src/Entity/RetourExperienceThermodynamique.php
- [x] à ajouter
```php

    /**
     * @ORM\ManyToOne(targetEntity=CodesDefautsClimExterieur::class, inversedBy="retourExperienceClimExterieurs")
     * @ORM\JoinColumn(name="codes_defauts_clim_exterieur_id")
     */
    private $codeDefautClimExterieur;
```

- [x] relation à faire
```php
    /**
     * @ORM\OneToMany(targetEntity=FichiersRetourExperienceClimExterieur::class, mappedBy="retourExperienceClimExterieur", cascade={"persist"}, orphanRemoval=true)
     */
    private $fichiersRetourExperienceClimExterieurs;
```
- [x] les implémentations
```php
class RetourExperienceClimExterieur implements EstUnRetourExperience, PossedeSondeRetourExperience
{...}
```
---
src/Entity/FichiersRetourExperienceThermodynamique.php

- [x] A ajouter (assert)
```php
    /**
     * @Vich\UploadableField(mapping="products_retour_experience_clim_exterieur", fileNameProperty="filename", size="fileSize")
     *
     * @var File
     */
    private $file;
```

- [x] date
```php
    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
    }
```

- [x] implémentation
```php
class FichiersRetourExperienceClimExterieur implements EstUnFichierRetourExperience
```

- [x] ajouter "@Vich\Uploadable()" dans les fichier
    - [x] CodesDefautsThermodynamique
    - [x] FichierThermodynamique

- [x] 
---
src/Controller/AdminController
- [x] ajouter la route de l'équipement
- [x] ajouter nouveau switch case
```php

	/**
	 * @Route("/admin/modele/edit",name="modele_edit", defaults={"equipementClass": App\Entity\Modeles::class})
	 * @Route("/admin/bruleur/edit",name="bruleur_edit", defaults={"equipementClass": App\Entity\Bruleurs::class})
	 * @Route("/admin/regulation/edit",name="regulation_edit", defaults={"equipementClass": App\Entity\Regulation::class})
	 * @Route("/admin/pacInterieur/edit",name="pac_interieur_edit", defaults={"equipementClass": App\Entity\PacInterieur::class})
	 * @Route("/admin/pacExterieur/edit",name="pac_exterieur_edit", defaults={"equipementClass": App\Entity\PacExterieur::class})
	 * @Route("/admin/climInterieur/edit",name="clim_interieur_edit", defaults={"equipementClass": App\Entity\ClimInterieur::class})
	 * @Route("/admin/climExterieur/edit",name="clim_exterieur_edit", defaults={"equipementClass": App\Entity\ClimExterieur::class})
	 * @Route("/admin/chauffeBain/edit",name="chauffe_bain_edit", defaults={"equipementClass": App\Entity\ChauffeBain::class})
	 */
	public function equipementEdit(Request $request, string $equipementClass, EntityManagerInterface $em)
	{
		$id = $request->query->get('id');
		$equipement = $this->getDoctrine()->getRepository($equipementClass)->findOneBy([$equipementClass == 'App\Entity\Modeles' ? 'moId' : 'id' => $id]);
		$marque = $equipement->getMarque();

		switch ($equipementClass) {
			case 'App\Entity\Modeles':
				$easyAdminform = EasyAdminModelesEditType::class;
				$templateRoute = 'EasyAdminBundle/modeles/easyadmin_edit_modeles.html.twig';
				$redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=Modeles&action=list&menuIndex=4&submenuIndex=0';
				break;
			case 'App\Entity\Bruleurs':
				$easyAdminform = EasyAdminBruleursEditType::class;
				$templateRoute = 'EasyAdminBundle/bruleurs/easyadmin_edit_bruleurs.html.twig';
				$redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=Bruleurs&action=list&menuIndex=3&submenuIndex=0';
				break;
```

- [ ] ligne ~2203 switch case à ajouter
```php
case 'Regulation':
/** @var EstUnRetourExperience */
$newRetourExperience = new RetourExperienceRegulation();
$typesParams = [
    'type' => 'retour_experience_regulation_type_types',
    'origine' => 'retour_experience_regulation_origine_types',
    'famillePiece' => 'retour_experience_regulation_famille_piece_types',
];
    break;



case 'RetourExperienceThermodynamique':
    $typeEntiteCibleFormList = [
        'typeEntitesCibles' => [
            'Gamme' => 'Gamme',
            'Thermodynamique' => 'Thermodynamique',
            'Code défaut' => 'CodesDefautsThermodynamique'
        ]
    ];
    break;
```
- [x] fonction duplication
```php
    switch ($equipementClass) {
        case 'Modeles':
            $type = 'fichiers_types';
            $folderName = '';
            $equipementName = 'chaudière(s)';
            break;
        case 'Bruleurs':
            $type = 'fichiers_bruleurs_types';
            $folderName = 'bruleurs';
            $equipementName = 'bruleur(s)';
            break;
        case 'Regulation':
            $type = 'fichiers_regulation_types';
            $folderName = 'regulation';
            $equipementName = 'regulation(s)';
            break;
        case 'PacExterieur':
            $type = 'fichiers_pac_exterieur_types';
            $folderName = 'pacExterieur';
            $equipementName = 'pompe(s) a chaleur extérieur';
            break;
        case 'ClimExterieur':
            $type = 'fichiers_clim_exterieur_types';
            $folderName = 'climExterieur';
            $equipementName = 'clim(s) extérieur';
            break;
        case 'ClimInterieur':
            $type = 'fichiers_clim_interieur_types';
            $folderName = 'climInterieur';
            $equipementName = 'clim(s) intérieur';
            break;
        case 'PacInterieur':
            $type = 'fichiers_pac_interieur_types';
            $folderName = 'pacInterieur';
            $equipementName = 'pompe(s) a chaleur intérieur';
            break;
        case 'ChauffeBain':
            $type = 'fichiers_chauffe_bain_types';
            $folderName = 'chauffeBain';
            $equipementName = 'chauffe-bain(s)';
            break;
    }
```
- [x] fonction equipementEdit
```php
    switch ($equipementClass) {
        case 'App\Entity\Modeles':
            $easyAdminform = EasyAdminModelesEditType::class;
            $templateRoute = 'EasyAdminBundle/modeles/easyadmin_edit_modeles.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=Modeles&action=list&menuIndex=4&submenuIndex=0';
            break;
        case 'App\Entity\Bruleurs':
            $easyAdminform = EasyAdminBruleursEditType::class;
            $templateRoute = 'EasyAdminBundle/bruleurs/easyadmin_edit_bruleurs.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=Bruleurs&action=list&menuIndex=3&submenuIndex=0';
            break;
        case 'App\Entity\Regulation':
            $easyAdminform = EasyAdminRegulationEditType::class;
            $templateRoute = 'EasyAdminBundle/regulation/easyadmin_edit_regulation.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=Regulation&action=list&menuIndex=8&submenuIndex=0';
            break;
        case 'App\Entity\PacInterieur':
            $easyAdminform = EasyAdminPacInterieursEditType::class;
            $templateRoute = 'EasyAdminBundle/pacInterieurs/easyadmin_edit_pac_interieurs.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=PacInterieur&action=list&menuIndex=7&submenuIndex=0';
            break;
        case 'App\Entity\PacExterieur':
            $easyAdminform = EasyAdminPacExterieursEditType::class;
            $templateRoute = 'EasyAdminBundle/pacExterieurs/easyadmin_edit_pac_exterieurs.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=PacExterieur&action=list&menuIndex=7&submenuIndex=1';
            break;
        case 'App\Entity\ClimInterieur':
            $easyAdminform = EasyAdminClimInterieursEditType::class;
            $templateRoute = 'EasyAdminBundle/climInterieurs/easyadmin_edit_clim_interieurs.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=ClimInterieur&action=list&menuIndex=6&submenuIndex=0';
            break;
        case 'App\Entity\ClimExterieur':
            $easyAdminform = EasyAdminClimExterieursEditType::class;
            $templateRoute = 'EasyAdminBundle/climExterieurs/easyadmin_edit_clim_exterieurs.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=ClimExterieur&action=list&menuIndex=6&submenuIndex=1';
            break;
        case 'App\Entity\ChauffeBain':
            $easyAdminform = EasyAdminChauffeBainsEditType::class;
            $templateRoute = 'EasyAdminBundle/chauffeBains/easyadmin_edit_chauffe_bains.html.twig';
            $redirectRoute = '/easy-admin-7H4kwBgTDygZ/?entity=ChauffeBain&action=list&menuIndex=5&submenuIndex=0';
            break;
    }
```

- [ ] fonction easyadminNewRetourExperience()
```php

			case 'Regulation':
				/** @var CodesDefautsRegulationRepository */
				$codesDefautsRepository = $this->getDoctrine()->getRepository(CodesDefautsRegulation::class);
				$equipementList = $equipementRepository->findBy(['marque' => $marque], ['libelle' => 'ASC']);
				$codesDefautsList = $codesDefautsRepository->findDistinctCodeByMarques($marque);
				$codesDefautsType = CodesDefautsRegulation::class;
				$fileAttachementType = RetourExperienceRegulationFileAttachmentType::class;
				$typeEnum = (new RetourExperienceRegulationTypeEnums())->getvalues();
				$origneEnum = (new RetourExperienceRegulationOrigineEnums())->getvalues();
				$famillePiece = (new RetourExperienceRegulationFamillePieceEnums())->getvalues();
				$typeChoices = array_combine($typeEnum, $typeEnum);
				$origineChoices = array_combine($origneEnum, $origneEnum);
				$famillePieceChoices = array_combine($famillePiece, $famillePiece);
				break;

```
- [x] fonction duplicationRetourExperienceAction
    - [x] switch case
    - [x] else if typeEntiteCible
- [x] fonction retour retourExperienceChoixEquipementAction ajouter nouvelle equipement dans les choix
```php
	/**
	 * @Route("/admin/easyadmin-choix-equipement-retour-experience", name="easyadmin_choix_equipement_retour_experience")
	 */
	public function retourExperienceChoixEquipementAction()
	{
		$marquesId = $this->request->query->get('id');
		$marquesRepository = $this->getDoctrine()->getRepository(Marques::class);
		$marque = $marquesRepository->findOneBy(['maId' => $marquesId]);

		$formFactory = $this->get('form.factory');

		$form = $formFactory->createNamedBuilder('formChoixEquipement', FormType::class, null, [
			'action' => $this->generateUrl('easyadmin_new_retour_experience'),
			'method' => 'POST'
		]);

		$form->add('equipement', ChoiceType::class, [
			'label' => 'TYPE D\'ÉQUIPEMENT',
			'label_attr' => ['class' => 'text-left pb-2 m-0'],
			'choices' => [
				'Brûleur' => 'Bruleurs',
				'Chaudière' => 'Modeles',
				'Chauffe-bain' => 'ChauffeBain',
				'PAC Extérieur' => 'PacExterieur',
				'PAC Intérieur' => 'PacInterieur',
				'Clim Extérieur' => 'ClimExterieur',
				'Clim Intérieur' => 'ClimInterieur',
				'Régulation' => 'Regulation'
			],
			'attr' => [
				'class' => 'w-100 pl-3 pt-2',
				'style' => 'background-color: white;'
			]
		])
```
---
- [x] Éditer le fichier templates/EasyAdminBundle/chauffeBains/easyadmin_edit_chauffe_bains.html.twig
(voir fonction equipementEdit dans AdminController.php) en méttant les bonnes valeurs

---
src/Controller/RedirectController.php

- [x] 1 constatnte EQUIPEMENT TO REDIRECT: ajouter nouvelle infos nouvelle equipement
```php

    const EQUIPEMENT_TO_REDIRECT = [
        Marques::class => [
            'slugName' => 'maSlug',
            'typeEquipement' => 'marques'
        ],
        Modeles::class => [
            'slugName' => 'moSlug',
            'typeEquipement' => 'modeles'
        ],
        Bruleurs::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'bruleurs'
        ],
        Regulation::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'regulation'
        ],
        PacInterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'pac_interieur'
        ],
        PacExterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'pac_exterieur'
        ],
        ClimExterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'clim_exterieur'
        ],
        ClimInterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'clim_interieur'
        ],
        CodesDefauts::class => [
            'slugName' => 'cdSlug',
            'typeEquipement' => 'codes_defauts'
        ],
        CodesDefautsBruleur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_bruleur'
        ],
        CodesDefautsRegulation::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_regulation'
        ],
        CodesDefautsPacInterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_pac_interieur'
        ],
        CodesDefautsPacExterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_pac_exterieur'
        ],
        CodesDefautsClimExterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_clim_exterieur'
        ],
        CodesDefautsClimInterieur::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_clim_interieur'
        ],
        ChauffeBain::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'chauffe_bain'
        ],
        CodesDefautsChauffeBain::class => [
            'slugName' => 'slug',
            'typeEquipement' => 'codes_defauts_chauffe_bain'
        ],
        SondesChaudieres::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_chaudieres'
        ],
        SondesChauffeBain::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_chauffe_bain'
        ],
        SondesPacExterieur::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_pac_exterieur'
        ],
        SondesPacInterieur::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_pac_interieur'
        ],
        SondesClimExterieur::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_clim_exterieur'
        ],
        SondesClimInterieur::class => [
            'slugName' => 'emplacement',
            'typeEquipement' => 'sondes_clim_interieur'
        ],
    ];
```
- [ ] 2 ROUTES_TO_REDIRECT

```php

    /**
     * {ancien-type-equipement} => [
     *      {ancienne-route} => [
     *          {nouveau-type-equipement} => [
     *              'newRouteName' => {nouvelle-route},
     *              'newParams' => [
     *                  {ancien-param} => {nouveau-param}
     *              ]
     *          ]
     *      ]
     * ]
     */
    const ROUTES_TO_REDIRECT_BY_EQUIPEMENT = [
        'modeles' => [
            'services'  => [
                'bruleurs' => [
                    'newRouteName' => 'services_bruleur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'bruleurSlug'
                    ]
                ],
                'regulation' => [
                    'newRouteName' => 'services_regulation',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'regulationSlug'
                    ]
                ],
                'pac_interieur' => [
                    'newRouteName' => 'services_pac_interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacInterieurSlug'
                    ]
                ],
                'pac_exterieur' => [
                    'newRouteName' => 'services_pac_exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacExterieurSlug'
                    ]
                ],
                'clim_exterieur' => [
                    'newRouteName' => 'services_clim_exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climExterieurSlug'
                    ]
                ],
                'clim_interieur' => [
                    'newRouteName' => 'services_clim_interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climInterieurSlug'
                    ]
                ],
                'chauffe_bain' => [
                    'newRouteName' => 'services_chauffe_bain',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'chauffeBainSlug'
                    ]
                ]
            ],
            'sondesChaudiereList'  => [
                'chauffe_bain' => [
                    'newRouteName' => 'sondesChauffeBainList',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'chauffeBainSlug'
                    ]
                ]
            ],
            'valeursSonde'  => [
                'chauffe_bain' => [
                    'newRouteName' => 'valeursSondeChauffeBain',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'slugSondeChauffeBain'
                    ]
                ]
            ],
            'regulations_compatible'  => [
                'regulation' => [
                    'newRouteName' => 'modeles_compatible',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'regulationSlug'
                    ]
                ]
            ],
            'codes'  => [
                'bruleur' => [
                    'newRouteName' => 'codes-bruleur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'bruleurSlug'
                    ]
                ],
                'regulation' => [
                    'newRouteName' => 'codes-regulation',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'regulationSlug'
                    ]
                ],
                'pac_interieur' => [
                    'newRouteName' => 'codes-pac-interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacInterieurSlug'
                    ]
                ],
                'pac_exterieur' => [
                    'newRouteName' => 'codes-pac-exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacExterieurSlug'
                    ]
                ],
                'clim_exterieur' => [
                    'newRouteName' => 'codes-clim-exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climExterieurSlug'
                    ]
                ],
                'clim_interieur' => [
                    'newRouteName' => 'codes-clim-interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climInterieurSlug'
                    ]
                ],
                'chauffe_bain' => [
                    'newRouteName' => 'codes-chauffe-bain',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'chauffeBainSlug'
                    ]
                ]
            ],
            'resolution'  => [
                'bruleur' => [
                    'newRouteName' => 'resolution-bruleur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'bruleurSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'regulation' => [
                    'newRouteName' => 'resolution-regulation',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'regulationSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'pac_interieur' => [
                    'newRouteName' => 'resolution-pac-interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacInterieurSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'pac_exterieur' => [
                    'newRouteName' => 'resolution-pac-exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'pacExterieurSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'clim_exterieur' => [
                    'newRouteName' => 'resolution-clim-exterieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climExterieurSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'clim_interieur' => [
                    'newRouteName' => 'resolution-clim-interieur',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'climInterieurSlug',
                        'cdSlug' => 'slug'
                    ]
                ],
                'chauffe_bain' => [
                    'newRouteName' => 'resolution-chauffe-bain',
                    'newParams' => [
                        'maSlug' => 'maSlug',
                        'moSlug' => 'chauffeBainSlug',
                        'cdSlug' => 'slug'
                    ]
                ]
            ]
        ]...]

    public function getServicesRoute(): array
    {
        return [
            'nomRoute' => 'services_clim_exterieur',
            'slugMarque' => 'maSlug',
            'slugEquipement' => 'climExterieurSlug'
        ];
    }
```
---
src/Entity/Marques.php
- [ ] ajouter "ORM JOINCOLUMN marques_id"
```php
    /**
     * @ORM\OneToMany(targetEntity=Thermodynamique::class, mappedBy="marque")
     * @ORM\JoinColumn(name="marques_id", referencedColumnName="id")
     */
    private $thermodynamiques;
```
---

src/Entity/RetourExperienceThermodynamique.php
- [ ] Ajouter "ORM JOINCOLUM marques_id"
```php
    /**
     * @ORM\ManyToOne(targetEntity=Marques::class, inversedBy="retourExperienceThermodynamiques")
     * @ORM\JoinColumn(nullable=false, referencedColumnName="MA_ID", name="marques_id")
     */
    private $marque;
```
---
src/Entity/Favori.php
- [x] Ajouter Conditions pour Thermodynamiques dans le fichier Entity favoris

```php
    public function getEquipement(): ?EstUnEquipement
    {
        if ($this->modele) {
            return $this->modele;
        } elseif ($this->bruleur) {
            return $this->bruleur;
        } elseif ($this->regulation) {
            return $this->regulation;
        } elseif ($this->chauffeBain) {
            return $this->chauffeBain;
        } elseif ($this->pacInterieur) {
            return $this->pacInterieur;
        } elseif ($this->pacExterieur) {
            return $this->pacExterieur;
        } elseif ($this->climExterieur) {
          return $this->climExterieur;
        } elseif ($this->climInterieur) {
            return $this->climInterieur;
        } else {
            return null;
        }
    }

    public function setEquipement(EstUnEquipement $equipement): self
    {
        if ($equipement instanceof Modeles) {
            $this->setModele($equipement);
        } elseif ($equipement instanceof Bruleurs) {
            $this->setBruleur($equipement);
        } elseif ($equipement instanceof Regulation) {
            $this->setRegulation($equipement);
        } elseif ($equipement instanceof ChauffeBain) {
            $this->setChauffeBain($equipement);
        } elseif ($equipement instanceof PacInterieur) {
            $this->setPacInterieur($equipement);
        } elseif ($equipement instanceof PacExterieur) {
            $this->setPacExterieur($equipement);
        } elseif ($equipement instanceof ClimExterieur) {
            $this->setClimExterieur($equipement);
        } elseif ($equipement instanceof ClimInterieur) {
            $this->setClimInterieur($equipement);
        }

        return $this;
    }
```
---


- [x] créer fichiers **list_fichiers_monEquipement.html.twig** dans le dossiers templates/files/fichiers/
- [x] créer nouveau dossier dont le nom correspond à celui du nouvelle équipement dans le dossier templates/files/
- [x] creer les differents fichier (file_code, file_libelle, file_resolution ...) dans le dossier du nouvelle equipement dans le dossier templates/files/monEquipement/ 
- [x] creer fichiers file_fichiers_retour_experience_thermodynamique et list_fichiers_retour_experience_thermodynamique dans fichier templates/files/retour_experience/file_fichiers_retour_experience_regulation.html.twig

---

src/Controller/DownloadController.php
- [x] fonction getImage DownloadCOntroller (switch case)

```php
  /**
   * @param User $user
   * @Route("/getImage/{type}/{imageName}", name="get_image")
   */
  public function getImage(string $type, string $imageName, UserInterface $user = null)
  {

    $profile = $user?->getProfile();
		$orga = $profile?->getOrga();
    $orgaId = $orga?->getUploadDirectory();
    $pathToImage = null;

    // Ajout d'un switch pour limiter l'accés seulement aux dossiers concernés
    switch ($type) {
      case 'code_chaudiere':
        $pathToImage = '../uploads/' . $type . '/images/' . $imageName;
        break;
      case 'libelle':
        $pathToImage = '../uploads/' . $type . '/images/' . $imageName;
        break;
      case 'resolution':
```
- [x] ajouter la nouvelle route de téléchargement de l'equipement

```php
  /**
   * Download file from admin
   *
   * @Route("/easy-admin-7H4kwBgTDygZ/download/{hash}", name="download", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\Fichiers::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_regulation/{hash}", name="download_regulation", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierRegulation::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_thermodynamique/{hash}", name="download_thermodynamique", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierThermodynamique::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_bruleur/{hash}", name="download_bruleur", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichiersBruleurs::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_pac_exterieur/{hash}", name="download_pac_exterieur", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierPacExterieur::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_pac_interieur/{hash}", name="download_pac_interieur", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierPacInterieur::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_clim_exterieur/{hash}", name="download_clim_exterieur", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierClimExterieur::class})
   * @Route("/easy-admin-7H4kwBgTDygZ/download_clim_interieur/{hash}", name="download_clim_interieur", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichierClimInterieur::class})
   * @Route("/download_chauffe_bain/{hash}", name="download_chauffe_bain", requirements={"hash" = "\w+"}, defaults={"fileClass": App\Entity\FichiersChauffeBain::class})
   *
   * @param string $hash
   * @return StreamedResponse
   * @throws \Exception
   */
  public function downloadDocumentAction(string $hash, string $fileClass)
  {
```

- [x] fonction retour experience downloadFichiersRetourExperienceDocumentAction, ajouter case

```php
  /**
   * Download retour experience file from admin
   *
   * @Route("/download_retour_experience/{type}/{hash}", name="download_retour_experience", requirements={"hash" = "\w+"})
   *
   * @param string $hash
   * @return StreamedResponse
   * @throws \Exception
   */
  public function downloadFichiersRetourExperienceDocumentAction(string $type, string $hash)
  {
    // Attention, pas de vérifications, si url tapé avec le bon hash, acces au fichier
    switch ($type) {
      case 'Modeles':
        $entity = $this->getDoctrine()->getRepository(FichiersRetourExperienceModeles::class)->findOneBy(['hash' => $hash]);
        break;
      case 'PacInterieur':
        $entity = $this->getDoctrine()->getRepository(FichiersRetourExperiencePacInterieur::class)->findOneBy(['hash' => $hash]);
        break;
      case 'PacExterieur':
```
- [x] ajouter les dépendances dans la fonction files
```php
  /**
   * Download file from front
   *
   * @Route("/{maSlug}/fichier/{fileType}/{type}/{categorySlug}/{hash}",
   *  name="files",
   *  requirements={
   *      "hash" = "([0-9a-zA-Z]*){32}"
   *  }
   * )
   * @param User $user
   */
  public function files(
    Marques $marques,
    string $type,
    string $categorySlug, 
    string $hash, 
    UserInterface $user = null, 
    FichiersRepository $fichiersRepository, 
    FichiersBruleursRepository $fichiersBruleursRepository, 
    EntityManagerInterface $em, 
    FichierRegulationRepository $fichierRegulationRepository, 
    ModelesRepository $modelesRepository, 
    BruleursRepository $bruleursRepository, 
    RegulationRepository $regulationRepository, 
    PacInterieurRepository $pacInterieurRepository, 
    FichierPacInterieurRepository $fichierPacInterieurRepository, 
    PacExterieurRepository $pacExterieurRepository, 
    FichierPacExterieurRepository $fichierPacExterieurRepository, 
    ChauffeBainRepository $chauffeBainRepository, 
    FichiersChauffeBainRepository $fichiersChauffeBainRepository, 
    ClimExterieurRepository $climExterieurRepository, 
    FichierClimExterieurRepository $fichierClimExterieurRepository, 
    ClimInterieurRepository $climInterieurRepository, 
    FichierClimInterieurRepository $fichierClimInterieurRepository, 
    Request $request)
  {
```
- [x] Switch case fonction viewerPdf ajouté nouveau "case" de l'equipement

- [x] fonction getFileFullname ajouter Ligne fichier du nouvelle equipement

```php
  /**
   * Get document file fullname (with path))
   *
   * @param Fichiers $entity
   * @return string
   */
  private function getFileFullname(EstUnFichier $entity)
  {
    $uploadFolder = match (get_class($entity)) {
      Fichiers::class => 'uploads/',
      FichiersBruleurs::class => 'uploads/bruleurs/',
      FichierPacInterieur::class => 'uploads/pacInterieur/',
      FichierPacExterieur::class => 'uploads/pacExterieur/',
      FichierRegulation::class => 'uploads/regulation/',
      FichierClimExterieur::class => 'uploads/climExterieur/',
      FichierClimInterieur::class => 'uploads/climInterieur/',
      FichiersChauffeBain::class => 'uploads/chauffeBain/',
      default => throw new NotFoundHttpException('Mauvais type de fichier')
    };
```
---
src/Functions/FilesLabel.php
- [ ] ajouter tableau FILE de l'equipement
- [ ] const FILE_EQUIPEMENT_LABELS, ajouter class de l'equipement et la ref de son tableau
---


src/Functions/TwigExtension.php
- [x] Ajouter la grammaire du nouvelle équipement
- [x] fonction getEquipementClassFromString switch case à compléter



- [ ] ajouter infos equipements dans le menu.yml avec son fichiers correspondant dans le dossier entities

- [ ] config/packages/admin/entities/FichiersRetourExperienceThermodynamique.yaml
---

TODO Entity:
- [x] Codes defauts
- [x] fichier
- [x] retourExperience
- [x] sondes
- [x] imagesPlaques
- [x] favoris
- [x] oldGamme ?
- [x] gamme ?
- [x] messageSlacks

**[FIXME]** Redirection sur les chauffes bains dans le panel à gauche apres avoir uploader un fichier: https://127.0.0.1:8000/easy-admin-7H4kwBgTDygZ/admin/thermodynamique/edit?entity=Thermodynamique&action=thermodynamique_edit&menuIndex=9&submenuIndex=0&sortField=id&sortDirection=DESC&page=1&referer=%252Feasy-admin-7H4kwBgTDygZ%252F%253Fentity%253DThermodynamique%2526action%253Dlist%2526menuIndex%253D9%2526submenuIndex%253D0%2526sortField%253Did%2526sortDirection%253DDESC%2526page%253D1&id=2

**[FIXME]** Image ne s'affiche pas dans le tableau: https://127.0.0.1:8000/easy-admin-7H4kwBgTDygZ/?entity=Thermodynamique&action=list&menuIndex=9&submenuIndex=0


**[QUESTION]** Comment nomme t'on l'equipement ?
    - Ballon thermodynamique ?
    - Chauffe-eaux thermodynamique ?
    - Thermodynamique ?
    - cumulus thermodynamique ?

**[QUESTION]** Quelle sont les étapes pour le processus de duplication ?
**[QUESTION]** src/Functions/FilesLabel.php les fonctions getBruleurs, getClimLables sont utiles ?

**[TODO]** Choisir la grammaire que l'on utilisera pour la thermodynamique
```php
      //TODO
      Thermodynamique::class => [
        'articlePartitif' => "de l'",
        'pronomDirect' => "l'",
        'preposition' => "d'",
        'pronomDemonstratif' => 'cette',
        'libelleEquipement' => 'unité intérieure de la pompe à chaleur',
        'ShortLibelle' => 'UI de la PAC',
        'meta_titre' => 'unités intérieures des pompes à chaleur',
        'libelleOuEnergie' => function (PacInterieur $pacInterieur) {
          $libelleOuEnergie = $pacInterieur->getLibelle();
          return $this->getTransco($libelleOuEnergie) ?? $libelleOuEnergie;
        },
        'typeEchange' => function (PacInterieur $pacInterieur) {
          $typeEchange = $pacInterieur->getTypeEchange();
          return $this->getTransco($typeEchange) ?? $typeEchange;
        }
      ]
```
