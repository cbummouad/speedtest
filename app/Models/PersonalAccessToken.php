<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;
use Illuminate\Database\Eloquent\Builder;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    protected $casts = [
        'abilities' => 'json',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
    ];

    protected $fillable = [
        'name',
        'token',
        'abilities',
        'expires_at',
    ];

    public function scopeActive(Builder $query): Builder
    {
        return $query->where(function ($query) {
            $query->whereNull('expires_at')
                ->orWhere('expires_at', '>', now());
        });
    }

    public function isExpired(): bool
    {
        return $this->expires_at && $this->expires_at->isPast();
    }

    public function hasAbility(string $ability): bool
    {
        return in_array($ability, $this->abilities ?? []);
    }

    public function getTokenPreview(): string
    {
        return substr($this->token, 0, 4) . '...' . substr($this->token, -4);
    }
}
