    <?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;


$app->get('/', function (Request $request) use ($app) {

    // create the form
	$form = createForm($app);

    return $app['twig']->render('index.twig', array(
		'form' => $form->createView()
	));
})
->bind('home');


/*
 *  -- handle contact form ----------------------------------------------------
 */
$app->match('/contact', function (Request $request) use ($app) {

	// create the form
	$form = createForm($app);

	$form->handleRequest($request);

	if ($form->isValid()) {

		$data = $form->getData();

		$message = \Swift_Message::newInstance()
		->setSubject(sprintf('Contact from %s %s', $data['name'], $data['email']))
		->setFrom(array('andre@at-info.ch'))
		->setTo(array('andre@at-info.ch'))
		->setBody($data['message']);

		$app['mailer']->send($message);

		$app['session']->getFlashBag()->add('message', 'Votre message à été envoyé !');


        // ajax detection
        if ($request->isXmlHttpRequest()) {
            return $app['twig']->render( 'messageSent.twig');
        }

		return $app->redirect($app['url_generator']->generate(
			'home'
		));
	}
	else {
		$sent = false; // needed due to validation
	}

    // ajax detection
    if ($request->isXmlHttpRequest()) {
        return $app['twig']->render( 'contact.twig', array(
    		'form' => $form->createView()
    	));
    }

	// handle form display
	return $app['twig']->render('index.twig', array(
		'form' => $form->createView()
	));
})
->convert('sent', function ($sent) {
	return (bool) $sent;
})
->value('sent', false)
->bind('contact/');


$app->error(function (\Exception $e, Request $request, $code) use ($app) {

	if ($app['debug']) {
		return;
	}

	$errorMessages = array(
		"404" => "Page not found.",
		"4xx" => "An error occurred on the client.",
		"500" => "Internal error",
		"5xx" => "An error occurred on the server.",
	);

	$errorMsg = "An error occured";

	if ( array_key_exists($code, $errorMessages) ) {
		$errorMsg = $errorMessages[$code];
	} // substr($code, 0, 1).'xx'
	else if ( array_key_exists(substr($code, 0, 1).'xx', $errorMessages) ) {
		$errorMsg = $errorMessages[substr($code, 0, 1).'xx'];
	}

	$app['session']->getFlashBag()->add('message', "$errorMsg : $code");


  	return $app->redirect($app['url_generator']->generate(
  		'home'
  	));
});



function createForm($app) {

	// create the form
	return $app['form.factory']
	->createBuilder(FormType::class)
	->add('name', TextType::class, array(

			'label' => 'Mon nom est ',
            'attr' => array('placeholder' => 'Name'),
			'constraints' => array(new Assert\NotBlank( array('message' => "Name minimum length is 5 caracters") ), new Assert\Length(array(
                'min' => 5,
                'minMessage' => 'Name minimum length is {{ limit }} caracters'
            )))
	))
	->add('email', EmailType::class, array(

			'label' => ' et voici mon email ',
            'attr' => array('placeholder' => 'Email'),
			'constraints' => array(new Assert\NotBlank( array('message' => "Email is required") ), new Assert\Email())
	))
	->add('message', TextareaType::class, array(

			'label' => 'Merci de me contacter au sujet de ',
            'attr' => array('placeholder' => 'Message'),
			'constraints' => array(new Assert\NotBlank( array('message' => "Name minimum length is 5 caracters") ), new Assert\Length(array(
                'min' => 15,
                'minMessage' => 'Name minimum length is {{ limit }} caracters'
            )))
	))
    ->setAction('/contact')
	->getForm();
}
