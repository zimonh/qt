<?php
//block from cross origin works with index where it is initiated
//and uses credentials from fetch(url,{credentials: 'same-origin'})
session_start();
if($_SESSION["origin"]){

	$id = $_GET["id"];
	$href = $_GET["href"];
		$adjust = $_GET["adjust"];
	/* gets the data from a URL */
	function get_data($href) {
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $href);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$data = curl_exec($ch);
		curl_close($ch);
		return $data;
	}
	$stringy = get_data($href);

	$dom = new DOMDocument();
	libxml_use_internal_errors(true);
	$dom->loadHTML($stringy);//put your complete source html string here
	libxml_use_internal_errors(false);


	$domx = new DOMXPath($dom);
	$items = $domx->query("//img[@onerror]");

	foreach($items as $item){$item->removeAttribute("onerror");}

	foreach(iterator_to_array($dom->getElementsByTagName('script')) as $node){
	$node->parentNode->removeChild($node);};
	foreach(iterator_to_array($dom->getElementsByTagName('input' )) as $node){
	    $node->parentNode->removeChild($node);};
	foreach(iterator_to_array($dom->getElementsByTagName('header')) as $node){
	    $node->parentNode->removeChild($node);};
	foreach(iterator_to_array($dom->getElementsByTagName('meta'  )) as $node){
	    $node->parentNode->removeChild($node);};
	foreach(iterator_to_array($dom->getElementsByTagName('link'  )) as $node){
	    $node->parentNode->removeChild($node);};

	if(isset($id) && $id !== ''){
	$elm=$dom->getElementById($id);}else{
		$elm=$dom;
	}//this will output DOMElement Object

	$tag = $elm->tagName;
	$cnt = $elm->nodeValue;
	//replace src="/ with src="$href/


	$str  = $dom->saveHtml($elm);
	if($adjust ==='yes'){
	if(parse_url($href)["host"] === "www.youtube.com"){

		$str = str_replace('href="/','href="https://'.parse_url($href)["host"].'/',$str);

	}else{
		$str = str_replace('src="/','src="'.$href.'/',$str);
		$str = str_replace('href="/','href="'.$href.'/',$str);
	}
	}

	if($href === 'http://www.mrlovenstein.com'){$str = str_replace('.png','_rollover.png',$str);}

	echo $str;

}
?>