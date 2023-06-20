<?php

namespace Scaleflex\Filerobot\Component\Profiler;

use Twig\Environment;
use Twig\TemplateWrapper;
use Shopware\Core\Framework\Uuid\Uuid;

class TwigDecorator extends Environment
{
    private $renders = [];

    public function render($name, array $context = []): string
    {
        $template = $name;

        if ($name instanceof TemplateWrapper) {
            $name = $name->getTemplateName();
        }

        if (strpos($name, 'WebProfiler') === false) {
            $this->renders[$name] = $context;
        }
        $pageContent = parent::render($template, $context);

        $salesChannelId = '';
        $currentDomain = '';
        if (isset($context['context'])) {
            $jsonContext = json_encode($context['context']);
            $arrContext = json_decode($jsonContext, true);
            $salesChannelId = (string)$arrContext['salesChannel']['id'];
            $currentDomain = $arrContext['salesChannel']['domains'][0]['url'];
        }

        return $this->overwriteImgTag($pageContent, $salesChannelId, $currentDomain);
    }

    public function getTemplateData(): array
    {
        return $this->renders;
    }

    private function overwriteImgTag(string $pageContent, string $salesChannelId, string $currentDomain): string
    {
        if ($salesChannelId != '') {
            if (stripos($pageContent, '<img') !== false) {
                $dom = new \DOMDocument();
                $useErrors = libxml_use_internal_errors(true);
                $dom->loadHTML(mb_convert_encoding($pageContent, 'HTML-ENTITIES', 'UTF-8'));
                libxml_use_internal_errors($useErrors);
                $dom->preserveWhiteSpace = false;

                foreach ($dom->getElementsByTagName('img') as $element) {
                    if ($element->hasAttribute('src')) {
                        $src = str_replace('%2B', '+', $element->getAttribute('src'));
                        $element->setAttribute('src', $src);
                    }

                    if ($element->hasAttribute('srcset')) {
                        $src = str_replace('%2B', '+', $element->getAttribute('srcset'));
                        $element->setAttribute('srcset', $src);
                    }
                }
                $pageContent = $dom->saveHTML($dom->documentElement);
                $pageContent = str_replace('https%3A', 'https:', $pageContent);
                $pageContent = str_replace('http%3A', 'http:', $pageContent);
                $pageContent = str_ireplace(['<html><body>', '</body></html>'], '', $pageContent);
            }
        }

        return $pageContent;
    }
}
